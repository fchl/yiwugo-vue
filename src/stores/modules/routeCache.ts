import { defineStore } from 'pinia'
import type { RouteRecordName } from 'vue-router'
import type { EnhancedRouteLocation } from '@/router/types'

const useRouteCacheStore = defineStore('route-cache', () => {
  const routeCaches = ref<RouteRecordName[]>([])

  const addRoute = (route: EnhancedRouteLocation) => {
    console.log(routeCaches.value)
    console.log(route.name)
    console.log(route.meta?.keepAlive)
    if (routeCaches.value.includes(route.name)) {
      console.log(`包含了 ${route.name}`)
      return
    }
    // 如果要进入的页面需要 keepAlive 缓存，将 name 添加到 include 数组中,router中的name和组件中的name要一致!
    if (route?.meta?.keepAlive) {
      routeCaches.value.push(route.name)
    }
  }
  // 如果要离开的页面是 keepAlive 缓存的，根据 deepth 判断是前进还是后退
  // 如果是后退,则清除keepAlive缓存
  const removeRoute = (from: EnhancedRouteLocation, to: EnhancedRouteLocation) => {
    if (from?.meta?.keepAlive && to.meta.level < from.meta.level) {
      const index = routeCaches.value.indexOf(from.name)
      if (index !== -1) {
        routeCaches.value.splice(index, 1)
      }
    }
  }
  return {
    routeCaches,
    addRoute,
    removeRoute,
  }
})

export default useRouteCacheStore
