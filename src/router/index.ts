import { createRouter, createWebHistory } from 'vue-router/auto'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import type { EnhancedRouteLocation } from './types'
import useRouteCacheStore from '@/stores/modules/routeCache'
import { useUserStore } from '@/stores'

import { isLogin } from '@/utils/auth'
import setPageTitle from '@/utils/set-page-title'

NProgress.configure({ showSpinner: true, parent: '#app' })

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

// This will update routes at runtime without reloading the page
if (import.meta.hot)
  handleHotUpdate(router)

router.beforeEach(async (to: EnhancedRouteLocation, from, next) => {
  NProgress.start()

  const routeCacheStore = useRouteCacheStore()
  const userStore = useUserStore()

  // 如果要进入的页面需要 keepAlive 缓存，将 name 添加到 include 数组中,router中的name和组件中的name要一致!
  routeCacheStore.addRoute(to)
  // 如果要离开的页面是 keepAlive 缓存的，根据 deepth 判断是前进还是后退
  // 如果是后退,则清除keepAlive缓存
  routeCacheStore.removeRoute(from, to)

  // Set page title
  setPageTitle(to.meta.title)

  if (isLogin() && userStore.userInfo.id === 0)
    await userStore.getInfo()

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
