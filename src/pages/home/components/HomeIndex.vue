<script setup lang="ts">
import { getArticleList, getHomeBanner } from '@/api/wan'

const bannerList = ref([])
async function getBanner() {
  try {
    const { data, errorCode } = await getHomeBanner()
    if (errorCode === 0) {
      console.log(data.size)
      bannerList.value = data
    }
  }
  catch (error) {
    console.error(error)
  }
}
const page = ref(0)
const list = ref([])
const loading = ref(false)
const finished = ref(false)

// function getSearchList() {
//   try {
//     console.log('开始加载搜索记录')
//     search(page.value, '玻璃弹珠漂亮极了').then(({ numfound, prslist }) => {
//     // console.log(`numfound = ${numfound}`)

//       list.value = list.value.concat(prslist)
//       // console.log(`pros = ${prslist.length}`)
//       // 加载状态结束
//       loading.value = false
//       if (list.value.length >= numfound) {
//         finished.value = true
//       }
//       else {
//         page.value++
//       }
//     })
//   }
//   catch (error) {
//     console.error(error)
//   }
// }

function getHomeList() {
  getArticleList(page.value).then(({ errorCode, data }) => {
    if (errorCode === 0) {
      console.log(data.datas.size)
      list.value = list.value.concat(data.datas)
      // 加载状态结束
      loading.value = false

      // 数据全部加载完成
      if (page.value >= data.pageCount) {
        finished.value = true
      }
      // 翻页
      // page.value++
    }
  })
}
function onLoad() {
  // 异步更新数据
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    getHomeList()
  }, 1000)
}

const isInitialized = ref(false)
onMounted(() => {
  if (!isInitialized.value) {
    console.log('HOme Index首次挂载执行')
    // 放置只需执行一次的初始化逻辑
    isInitialized.value = true
    getBanner()
  }
})

onActivated(() => {
  console.log('HOme Index 组件激活时执行')
  // 放置每次激活时都需要执行的逻辑
})
</script>

<template>
  <div>
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in bannerList" :key="image">
        <img :src="image.imagePath" height="200" width="100%" fit="cover">
      </van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item icon="photo-o" text="鸿蒙" />
      <van-grid-item icon="photo-o" text="问答" />
      <van-grid-item icon="photo-o" text="专栏" />
      <van-grid-item icon="photo-o" text="路线" />
    </van-grid>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="item in list" :key="item.id" class="flex-row p-12">
        <span class="text-6xl"> {{ item.title }}</span>
        <div class="flex justify-between pa-10 text-5xl text-gray-500">
          <span>  {{ item.chapterName }} </span>   <span>{{ item.niceDate }}</span>
        </div>
        <!-- 下边框 -->
        <div class="van-hairline--bottom" />
      </div>
    </van-list>
  </div>
</template>
