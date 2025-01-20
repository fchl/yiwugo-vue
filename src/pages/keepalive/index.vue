<script setup lang="ts">
// 定义组件名
defineOptions({
  name: 'KeepAlive',

})

const value = ref(1)

const isInitialized = ref(false)

onMounted(() => {
  if (!isInitialized.value) {
    console.log('首次挂载执行')
    // 放置只需执行一次的初始化逻辑
    isInitialized.value = true
  }
})

onActivated(() => {
  console.log('组件激活时执行')
  // 放置每次激活时都需要执行的逻辑
})
</script>

<template>
  <p>{{ $t('keepAlive.label') }}</p>
  <van-stepper v-model="value" />
</template>

<route lang="json5">
  {
    name: 'KeepAlive',
    meta: {
      title: '🧡 KeepAlive',
      i18n: 'menus.keepAlive',
      keepAlive: true
    },
  }
  </route>
