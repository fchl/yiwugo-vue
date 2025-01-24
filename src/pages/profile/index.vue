<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores'
import defaultAvatar from '@/assets/images/default-avatar.svg'

defineOptions({
  name: 'Profile',
})

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

function login() {
  if (userInfo.value)
    return

  router.push({ name: 'login', query: { redirect: 'profile' } })
}
const active = ref(0)
</script>

<template>
  <div>
    <VanCellGroup :inset="true">
      <van-cell center :is-link="!userInfo" @click="login">
        <template #title>
          <van-image :src="userInfo.icon || defaultAvatar" round class="h-56 w-56" />
        </template>

        <template #value>
          <span v-if="userInfo">{{ userInfo.nickname }}</span>
          <span v-else>{{ $t('profile.login') }}</span>
        </template>
      </van-cell>
    </VanCellGroup>
    <VanCellGroup :inset="true" class="!mt-16">
      <van-cell :title="$t('profile.settings')" icon="setting-o" is-link to="/settings" />
      <van-cell :title="$t('profile.docs')" icon="flower-o" is-link url="https://easy-temps.github.io/easy-docs/vue3-vant-mobile/" />
    </VanCellGroup>

    <van-tabs v-model:active="active">
      <van-tab title="标签 12">
        内容 1
      </van-tab>
      <van-tab title="标签 22">
        内容 2
      </van-tab>
      <van-tab title="标签 33">
        内容 3
      </van-tab>
      <van-tab title="标签 44">
        内容 4
      </van-tab>
    </van-tabs>
  </div>
</template>

<route lang="json5">
{
  name: 'Profile',
  meta: {
    title: '个人中心',
    i18n: 'menus.profile',
    keepAlive:true
  },

}
</route>
