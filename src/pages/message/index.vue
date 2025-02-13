<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { v7 as uuidv4 } from 'uuid'
import { getEmjioByText, getEmjioList } from '@/utils/emjio-utils'

const isShowMore = ref(true)
const isShowSend = ref(false)
// 是否显示表情布局
const isShowEmjio = ref(false)

// 消息列表
const messages = ref<Array<{ id: string, type: string, content: string | ArrayBuffer, timestamp: number, isSelf: boolean }>>([
  {
    id: uuidv4(),
    type: 'text',
    content: '你好！',
    timestamp: new Date().getTime(),
    isSelf: false,
  },
])

// 输入文本
const inputText = ref('')
// 图片预览
const previewImage = ref(null)
const showImage = ref(false)

// DOM 引用
const messageList = ref(null)
const fileInput = ref(null)

// 格式化时间
function formatTime(timestamp) {
  const date = new Date(timestamp)
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
}

// 发送文本消息
async function sendTextMessage() {
  if (!inputText.value.trim())
    return

  const newMessage = {
    id: uuidv4(),
    type: 'text',
    content: inputText.value.trim(),
    timestamp: new Date().getTime(),
    isSelf: true,
  }

  messages.value.push(newMessage)
  inputText.value = ''
  scrollToBottom()

  // 模拟回复
  setTimeout(() => {
    messages.value.push({
      id: uuidv4(),
      type: 'text',
      content: '已收到您的消息',
      timestamp: new Date().getTime(),
      isSelf: false,
    })
    scrollToBottom()
  }, 1000)
}

// 发送表情消息
async function sendEmjio(emjio: string) {
  inputText.value += emjio
  console.log(inputText.value)
}

function showEmjio() {
  isShowEmjio.value = !isShowEmjio.value
}

function handleFocus() {
  isShowEmjio.value = false
}

// 触发文件选择
function triggerFileInput() {
  isShowEmjio.value = false
  fileInput.value.click()
}

// 处理图片上传
function handleImageUpload(e) {
  const file = e.target.files[0]
  if (!file)
    return

  const reader = new FileReader()
  reader.onload = (event) => {
    const newMessage = {
      id: uuidv4(),
      type: 'image',
      content: event.target.result,
      timestamp: new Date().getTime(),
      isSelf: true,
    }
    messages.value.push(newMessage)
    scrollToBottom()
    fileInput.value.value = '' // 清空输入
  }
  reader.readAsDataURL(file)
}

// 图片预览
function showPreview(imgUrl) {
  previewImage.value = imgUrl
  showImage.value = true
}

// 自动滚动到底部
function scrollToBottom() {
  nextTick(() => {
    if (messageList.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight
    }
  })
}

// 初始化滚动
onMounted(() => {
  scrollToBottom()
})

watch(inputText, (newVal) => {
  console.log(inputText.value)
  console.log(newVal)
  if (newVal && newVal.length > 0) {
    isShowMore.value = false
    isShowSend.value = true
  }
  else {
    isShowMore.value = true
    isShowSend.value = false
  }
})

// 使用简单<img>标签 替换表情符号 并展示 ：
function realTextContent(content: string) {
  return content.replace(/\[.*?\]/g, (p1) => {
    const imgSrc = getEmjioByText(p1)
    if (imgSrc) {
      return `<img src="${imgSrc}" class="w-20 h-20" />`
    }
    return p1
  })
}
</script>

<template>
  <div class="chat-container">
    <!-- 消息列表 -->
    <div ref="messageList" class="message-list">
      <div
        v-for="message in messages"
        :key="message.id"
        class="message-item" :class="[{ self: message.isSelf }]"
      >
        <div class="message-content">
          <!-- 文本消息 -->
          <div v-if="message.type === 'audio'" class="text-message">
            语音
          </div>
          <!-- 图片消息 -->
          <img
            v-else-if="message.type === 'image'"
            :src="message.content as string"
            class="image-message"
            @click="showPreview(message.content)"
          >
          <!-- 文本消息 -->
          <div v-else class="text-message">
            <span v-html="realTextContent(message.content as string)" />
          </div>
        </div>
        <div class="message-time">
          {{ formatTime(message.timestamp) }}
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <div class="input-box">
        <textarea
          v-model="inputText"
          style="height: 30px;flex-grow: 1;font-size:13px ;padding: 5px;"
          placeholder="输入消息..."
          @focus="handleFocus()"
          @keyup.enter.exact="sendTextMessage"
        />
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          style="display: none"
          @change="handleImageUpload"
        >
        <van-icon size="30" class="iconfont icon-face-smile-b pl-8 pr-8" @click="showEmjio" />
        <van-icon v-show="isShowMore" size="30" class="iconfont icon-add-circle pr-8" @click="triggerFileInput" />
        <van-button v-show="isShowSend" type="primary" size="small" style="--van-button-small-height:30px;--van-button-default-font-size:13px" @click="sendTextMessage">
          发送
        </van-button>
      </div>
      <div v-show="isShowEmjio" class="emjio-box">
        <van-grid column-num="7" :border="false" direction="horizontal" style="width: 100%;padding: 5px;">
          <van-grid-item v-for="emjio in getEmjioList() " :key="emjio.key">
            <img :src="emjio.value" :alt="emjio.key" style="width: 25px;height: 25px;" @click="sendEmjio(emjio.key)">
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <!-- 图片预览弹窗 -->

    <van-overlay :show="showImage" @click="showImage = false">
      <div class="wrapper">
        <div class="block">
          <van-image :src="previewImage" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<style scoped>
.chat-container {
  width: 100%;
  margin: 0 auto;
  height: calc(100vh - 94px);
  display: flex;
  flex-direction: column;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f5f5f5;
}

.message-item {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  flex-direction: column;
  align-items: start;
}
.message-item.self {
  align-items: end;
}
.message-content {
  max-width: 70%;
  padding: 10px 15px;
  position: relative;
}

.text-message {
  padding: 10px;
  border-radius: 8px;
  word-break: break-word;
  background: #fff;
}

.self .text-message {
  word-break: break-word;
  background: #60aaec;
  color: #fff;
}

.image-message {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  cursor: pointer;
}

.message-time {
  width: 100%;
  font-size: 12px;
  color: rgba(101, 102, 105, 0.8);
  margin-top: 5px;
  text-align: center;
}

.self .message-time {
  color: rgba(85, 142, 241, 0.8);
  text-align: center;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 80%;
  height: auto;
}

.input-area {
  min-height: 40px;
  padding: 5px;
  background-color: #fff;
}
.input-box {
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-left: 5px;
  padding-right: 5px;
}
.van-grid {
  --van-grid-item-content-padding: 6px;
}
</style>

  <route lang="json5">
    {
    name: 'message',
    meta: {
    title: '消息',
    },
    }
  </route>
