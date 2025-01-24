<script setup lang="ts">
import { getShortVideo } from '@/api/openapi'
import 'video.js/dist/video-js.css'

const list = ref([])

const page = ref(1)

function onLoad() {
  getShortVideo(page.value).then(({ code, result }) => {
    if (code === 200) {
      list.value = list.value.concat(result.list)
      if (list.value.length >= result.total) {
        // console.log('')
      }
      if (list.value.length > 0 && page.value === 1) {
        setTimeout(() => {
          onChange(0)
        }, 200)
      }
    }
  })
}

const videoRefs = ref([])

function onChange(index) {
  videoRefs.value.forEach((_item, position) => {
    const player = videoRefs.value[position]
    if (position === index) {
      player.play()
    }
    else {
      player.pause()
    }
  })

  if (index > 1 && index === list.value.length - 1) {
    page.value++
    onLoad()
  }
}

const isInitialized = ref(false)
onMounted(() => {
  if (!isInitialized.value) {
    console.log('首次挂载执行')
    // 放置只需执行一次的初始化逻辑
    isInitialized.value = true
    onLoad()
  }
})

onActivated(() => {
  console.log('组件激活时执行')
  // 放置每次激活时都需要执行的逻辑
})
</script>

<template>
  <van-swipe vertical :show-indicators="false" :loop="false" @change="onChange">
    <van-swipe-item v-for="(item, position) in list" :key="item.id" class="video-show">
      <!-- controls 显示控件 -->
      <video
        :id="`video-player-${position}`"
        ref="videoRefs"
        class="video-item"
        preload="none"
        muted
        :poster="item.userPic"
        :src="item.playUrl"
        type="video/mp4"
      >
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
        </p>
      </video>
      <!-- <van-image width="100%" height="300px" fit="contain" :src="item.userPic" /> -->
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped>
/* 使图标填满整个格子 */
.video-show {
  /*  // 宽度设置为父容器的宽度 */
  width: 100%;
  height: calc(100vh - 100px);
  background-color: rgb(8, 8, 8);
}
/* 在你的 CSS 文件中添加这个类  使用 !important 是为了确保这个样式覆盖其他样式 */
.no-controls .vjs-control-bar {
  display: none !important;
}
.video-item {
  /*  // 宽度设置为父容器的宽度 */
  display: block;
  width: 100%;
  height: calc(100vh - 100px);
  /*object-fit: cover;*/
  object-fit: center;
  background-color: rgb(11, 10, 10);
}
</style>

<route lang="json5">
{
  name: 'Video',
  meta: {
     title: '视频',
    },
}
</route>
