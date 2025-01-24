<script setup lang="ts">
const route = useRoute()
const url = (route.query as { targetUrl: string }).targetUrl
console.log(url)
const httpLink = ref('')
const loadShow = ref(true)
onMounted(() => {
  httpLink.value = url
  setTimeout(() => {
    loadShow.value = false
  }, 500)
})
</script>

<template>
  <div class="scroll-container">
    <iframe
      :src="httpLink"
      frameborder="0"
    />
    <div v-show="loadShow" class="loding-view">
      <van-loading size="60px">
        加载中...
      </van-loading>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  width: 100%; /* 或者你想要的固定宽度 */
  height: calc(100vh - 50px); /* 或者你想要的固定高度 */

  overflow: hidden;
  position: relative;
}

iframe {
  position: absolute;
  z-index: 10;
  width: calc(100% + 12px); /* 使 iframe 填充容器的宽度  + 滚动条的宽度*/
  height: calc(100% + 12px); /* 使 iframe 填充容器的高度，但注意这不会使其自动调整内容高度 */
  border: none; /* 移除 iframe 的默认边框 */
}
.loding-view {
  position: absolute;
  z-index: 20;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
}
</style>

<route lang="json5">
{
  name: 'link',
  meta: {
     title: 'link',
    },
}
</route>
