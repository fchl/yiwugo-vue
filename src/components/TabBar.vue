<script setup lang="ts">
import { routeWhiteList } from '@/config/routes'

const { t } = useI18n()
const active = ref(0)
const route = useRoute()

const show = computed(() => route.name && routeWhiteList.includes(route.name))
</script>

<template>
  <van-tabbar v-if="show" v-model="active" placeholder route>
    <van-tabbar-item replace to="/home">
      {{ t('layouts.home') }}
      <template #icon>
        <van-icon size="20" class="iconfont icon-home pb-2 pt-4" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/video">
      {{ t('layouts.video') }}
      <template #icon>
        <van-icon size="24" class="iconfont icon-zhibo" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/message">
      {{ t('layouts.message') }}
      <template #icon>
        <van-icon size="24" class="iconfont icon-faxian" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/profile">
      {{ t('layouts.profile') }}
      <template #icon>
        <van-icon size="24" class="iconfont icon-profile" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
.van-tabbar-item {
  --van-tabbar-item-height: 40px;
  --van-tabbar-item-font-size: 12px;
}
</style>
