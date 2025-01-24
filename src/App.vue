<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useAppStore from '@/stores/modules/app'
import useRouteCache from '@/stores/modules/routeCache'
import useAutoThemeSwitcher from '@/hooks/useAutoThemeSwitcher'

useHead({
  title: 'Wan Vue',
  meta: [
    {
      name: 'description',
      content: 'An mobile web apps wan',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

const appStore = useAppStore()
const { mode } = storeToRefs(appStore)

const { initializeThemeSwitcher } = useAutoThemeSwitcher(appStore)

const keepAliveRouteNames = computed(() => {
  return useRouteCache().routeCaches as string[]
})

onMounted(() => {
  initializeThemeSwitcher()
})
</script>

<template>
  <VanConfigProvider :theme="mode">
    <div class="flex flex-col">
      <NavBar />

      <router-view v-slot="{ Component, route }">
        <section class="app-wrapper">
          <keep-alive :include="keepAliveRouteNames">
            <component
              :is="Component"
              v-if="route.meta.keepAlive"
              :key="route.name"
            />
          </keep-alive>
          <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name" />
        </section>
      </router-view>
      <TabBar />
    </div>
  </VanConfigProvider>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  flex-grow: 1;
  padding: 0px;
}
</style>
