<script setup lang="ts">
import { showToast } from 'vant'
import { getImages } from '@/api/openapi'
import axios from 'axios'
import { search } from '@/api/yiwugo'
import getRealYwgImage from '@/utils/image-utils'

const keyword = ref('')
const onSearch = key => toSearchWords(key)

const list = ref([])
const page = ref(0)
function toSearchImage(type) {
  getImages(page.value, type).then(({ code, result }) => {
    if (code === 200) {
      list.value = list.value.concat(result.list)
      if (list.value.length >= result.total) {
        // console.log('')
      }
      else {
        if (list.value.length > 0 && page.value === 1) {
          setTimeout(() => {
            page.value++
            toSearchImage(type)
          }, 200)
        }
      }
    }
  })
}

function toSearchWords(key) {
  console.log(key)
  search(page.value, key).then(({ numfound, prslist }) => {
    if (prslist.length > 0) {
      list.value = list.value.concat(prslist)
      if (list.value.length >= numfound) {
        console.log(list.value.length)
      }
      else {
        if (list.value.length > 0 && page.value === 1) {
          console.log('')
        }
      }
    }
  })
}
const imageListType = ref([{ type: 'animal', text: '动物' }, { type: 'beauty', text: '美女' }, { type: 'car', text: '汽车' }, { type: 'comic', text: '漫画' }, { type: 'food', text: '食物' }, { type: 'game', text: '游戏' }, { type: 'movie', text: '电影' }, { type: 'person', text: '人物' }, { type: 'phone', text: '手机' }, { type: 'scenery', text: '风景' }])
const showPopover = ref(false)

// 下载图片 通过 axios

function loadImage(imageUrl) {
  axios({
    method: 'get',
    baseURL: '/img/',
    url: imageUrl,
    responseType: 'arraybuffer',
    headers: {
      // Referer: 'https://ywgimg.yiwugo.com/',
      // 'Content-Type': 'text/plain',
    },
  })
    .then((response) => {
      console.log(response.data)
      // 将二进制数据转换为 Blob 对象
      const blob = new Blob([response.data], { type: 'image/jpeg' }) // 注意：根据实际情况设置 MIME 类型
      // 创建一个指向 Blob 对象的 URL
      const url = URL.createObjectURL(blob)
      // 创建一个 <img> 元素并设置其 src 属性为上面创建的 URL
      const img = document.createElement('img')
      img.src = url
      // 将 <img> 元素添加到 DOM 中（可选）
      document.body.appendChild(img)
      // 如果你不再需要这个 URL，可以释放它（可选）
      // URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error downloading image:', error)
    })
}

function onSelect(action) {
  showToast(action.text)
  toSearchImage(action.text)
}

let widthImage = window.innerWidth / 2 - 1

onMounted(() => {
  // 获取屏幕宽度
  const screenWidth = window.innerWidth
  widthImage = screenWidth / 2 - 1
  // 打印屏幕宽度到控制台
  console.log(`屏幕宽度是: ${screenWidth} 像素`)
})

loadImage('i004/2022/07/17/81/84be66a989fcba4e6eacb19274d08c4c.jpg')
</script>

<template>
  <div>
    <form action="/">
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        left-icon=""
        @search="onSearch"
      >
        <template #action>
          <div @click="toSearchWords(keyword)">
            搜索
          </div>
        </template>
        <template #label>
          <van-popover :show="showPopover" :actions="imageListType" actions-direction="vertical" @select="onSelect">
            <template #reference>
              <div class="pl-0 text-blue">
                类型 <span class="iconfont icon-xia" />
              </div>
            </template>
          </van-popover>
        </template>
      </van-search>
    </form>
    <van-grid :column-num="2" :border="true" :gutter="0" style="--van-grid-item-content-padding:0px">
      <van-grid-item v-for="item in list" :key="item" class="bg-red">
        <div>
          <van-image
            v-if="getRealYwgImage(item.picture1).indexOf('img1') > 0"
            class="bg-green"
            :src="loadImage(getRealYwgImage(item.picture1))"
            :width="widthImage"
            :height="widthImage"
          />
          <van-image
            v-if="getRealYwgImage(item.picture1).indexOf('img1') < 0"
            class="bg-red"
            :src="getRealYwgImage(item.picture1)"
            :width="widthImage"
            :height="widthImage"
          />
          <span style="height:50px">{{ item.title }}</span>
        </div>
      </van-grid-item>
    </van-grid>

    <!-- <img src="https://img1.yiwugo.com/i004/2022/07/17/81/84be66a989fcba4e6eacb19274d08c4c.jpg?x-oss-process=image/resize,w_300,h_300" width="266" height="276" crossOrigin="anonymous"> -->
  </div>
</template>

<route lang="json5">
{
  name: 'Search',
  meta: {
    title: '搜索',
    i18n: 'menus.unocssExample'
  },
}
</route>
