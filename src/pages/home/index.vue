<script setup lang="ts">
import { getHomeBanner, getHomeTab } from '@/api/wan'
import HomeIndex from './components/HomeIndex.vue'
import HomeTab from './components/HomeTab.vue'
import router from '@/router'

defineOptions({
  name: 'Home',
})
const checked = ref<boolean>(isDark.value)

watch(
  () => isDark.value,
  (newMode) => {
    checked.value = newMode
  },
  { immediate: true },
)

const active = ref(0)

async function getBanner() {
  try {
    const { data, errorCode } = await getHomeBanner()
    if (errorCode === 0) {
      console.log(data.size)
    }
  }
  catch (error) {
    console.error(error)
  }
}
const tabList = ref([])
async function getTab() {
  try {
    const { data, errorCode } = await getHomeTab()
    if (errorCode === 0) {
      let list = []
      list.push({ articles: [], cid: 0, name: '推荐' })
      list = list.concat(data)
      tabList.value = list
    }
  }
  catch (error) {
    console.error(error)
  }
}
const isInitialized = ref(false)
onMounted(() => {
  if (!isInitialized.value) {
    console.log('首次挂载执行')
    // 放置只需执行一次的初始化逻辑
    isInitialized.value = true
    getBanner()
    getTab()
  }
})

onActivated(() => {
  console.log('组件激活时执行')
  // 放置每次激活时都需要执行的逻辑
})

function targetSearch() {
  router.push('/search')
}
</script>

<template>
  <div>
    <div class="bg-white" @click="targetSearch">
      <van-search shape="round" placeholder="请输入搜索关键词" />
    </div>

    <van-tabs v-model:active="active" swipeable sticky>
      <van-tab v-for="item in tabList" :key="item.cid" :title="`${item.name}`">
        <div v-if="item.cid === 0">
          <HomeIndex />
        </div>
        <div v-else>
          <HomeTab :tab-list="item.articles" />
        </div>
      </van-tab>
      <template #nav-bottom />
    </van-tabs>
  </div>
</template>

<route lang="json5">
{
  name: 'Home',
  meta: {
    hideNav: true,
    title: '主页',
    i18n: 'menus.home',
    keepAlive:true
  },
}
</route>
