<script setup lang="ts">
const checked = ref<boolean>(isDark.value)

watch(
  () => isDark.value,
  (newMode) => {
    checked.value = newMode
  },
  { immediate: true },
)
const router = useRouter()
onMounted(() => {
  setTimeout(() => {
    router.replace('/home')
  }, 2000)
})
</script>

<template>
  <div>
    <van-image
      width="100%"
      height="100%"
      fit="fill"
      src="/launch-page.png"
    />
  </div>
</template>

<route lang="json5">
{
  name: '/',
  meta: {
    hideNav: true,
    title: '启动页面',
    },
}
</route>
