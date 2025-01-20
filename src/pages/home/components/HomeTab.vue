<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  tabList: {
    type: [],
    required: true,
  },
})

console.log(props.tabList)
</script>

<template>
  <div>
    <van-list>
      <div v-for="item in props.tabList" :key="item.id" class="flex-row p-12">
        <span class="text-6xl"> {{ item.title }}</span>
        <div class="flex justify-between pa-10 text-5xl text-gray-500">
          <span>  {{ item.chapterName }} </span>   <span>{{ item.niceDate }}</span>
        </div>
        <!-- 下边框 -->
        <div class="van-hairline--bottom" />
      </div>
    </van-list>
  </div>
</template>
