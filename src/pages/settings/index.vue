<script setup lang="ts">
import { showConfirmDialog } from 'vant'
import router from '@/router'
import { useUserStore } from '@/stores'
import { version } from '~root/package.json'
import { isLogin } from '@/utils/auth'
import type { PickerColumn } from 'vant'
import useAppStore from '@/stores/modules/app'
import { languageColumns, locale } from '@/utils/i18n'

const { t } = useI18n()
const userStore = useUserStore()
function Logout() {
  showConfirmDialog({
    title: t('settings.comfirmTitle'),
  })
    .then(() => {
      userStore.logout()
      router.push({ name: 'home' })
    })
    .catch(() => {})
}

const appStore = useAppStore()
const checked = ref<boolean>(isDark.value)

watch(
  () => isDark.value,
  (newMode) => {
    checked.value = newMode
  },
  { immediate: true },
)

function toggle() {
  toggleDark()
  appStore.switchMode(isDark.value ? 'dark' : 'light')
}

const showLanguagePicker = ref(false)
const languageValues = ref<Array<string>>([locale.value])
const language = computed(() => languageColumns.find(l => l.value === locale.value).text)

function onLanguageConfirm(event: { selectedOptions: PickerColumn }) {
  locale.value = event.selectedOptions[0].value as string
  showLanguagePicker.value = false
}

const menuItems = computed(() => ([
  { title: t('menus.mockGuide'), route: 'mock' },
  { title: t('menus.echartsDemo'), route: 'charts' },
  { title: t('menus.unocssExample'), route: 'unocss' },
  { title: t('menus.persistPiniaState'), route: 'counter' },
  { title: t('menus.keepAlive'), route: 'keepalive' },
  { title: t('menus.404Demo'), route: 'unknown' },
]))
</script>

<template>
  <div class="text-center">
    <VanCellGroup :title="t('menus.basicSettings')" :border="false" :inset="true">
      <VanCell center :title="t('menus.darkMode')">
        <template #right-icon>
          <VanSwitch v-model="checked" size="20px" aria-label="on/off Dark Mode" @click="toggle()" />
        </template>
      </VanCell>

      <VanCell
        is-link
        :title="t('menus.language')"
        :value="language"
        @click="showLanguagePicker = true"
      />
    </VanCellGroup>

    <VanCellGroup :title="t('menus.exampleComponents')" :border="false" :inset="true">
      <template v-for="item in menuItems" :key="item.route">
        <VanCell :title="item.title" :to="item.route" is-link />
      </template>
    </VanCellGroup>

    <van-popup v-model:show="showLanguagePicker" position="bottom">
      <van-picker
        v-model="languageValues"
        :columns="languageColumns"
        @confirm="onLanguageConfirm"
        @cancel="showLanguagePicker = false"
      />
    </van-popup>
    <VanCellGroup :inset="true">
      <van-cell v-if="isLogin()" :title="$t('settings.logout')" clickable class="van-text-color" @click="Logout" />
      <template #title />
    </VanCellGroup>

    <div class="mt-10 text-gray">
      {{ $t("settings.currentVersion") }}: v{{ version }}
    </div>
  </div>
</template>

<style scoped>
.van-text-color {
  --van-cell-text-color: var(--van-red);
}
</style>

<route lang="json5">
{
  name: 'settings',
  meta: {
    title: '我的设置',
    i18n: 'menus.settings'
  },
}
</route>
