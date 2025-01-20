<script setup lang="ts">
import { routeWhiteList } from '@/config/routes'

const route = useRoute()
const router = useRouter()

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/')
}

const { t } = useI18n()

function hideNav() {
  console.log('hideNav')

  console.log(route.meta)
  if (!route.meta)
    return true
  console.log(!route.meta.hideNav)
  return !route.meta.hideNav
}

const title = computed(() => {
  if (!route.meta)
    return ''

  return route.meta.i18n ? t(route.meta.i18n) : (route.meta.title || '')
})

const showLeftArrow = computed(() => route.name && routeWhiteList.includes(route.name))
</script>

<template>
  <VanNavBar
    v-show="hideNav()"
    :title="title"
    :fixed="true" clickable
    placeholder
    :left-arrow="!showLeftArrow"
    z-index="100"
    @click-left="onBack"
  />
</template>
