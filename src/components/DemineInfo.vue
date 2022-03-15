<template>
  <div class="flex">
    <div class="text-lg basis-full flex items-center">
      <MineSvg class="w-6 h-6 inline-block mr-1 text-red-500/85" />
      <strong class="text-red-500">{{ minesCount - flagsCount }}</strong>
    </div>
    <div class="text-lg basis-auto flex items-center">
      <ClockSvg class="w-5 h-5 inline-block mr-2 text-blue-500/85" />
      <strong class="text-blue-500"> {{ minutes }}:{{ seconds }} </strong>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MineSvg from '~/assets/mine.svg'
import ClockSvg from '~/assets/clock.svg'

interface Props {
  flagsCount: number
  minesCount: number
  status: string
}

const $props = defineProps<Props>()

const { timestamp, pause } = useTimestamp({
  offset: Date.now() * -1,
  interval: 1000,
  controls: true,
})
const minutes = computed(() => String(Math.floor(timestamp.value / 60000)).padStart(2, '0'))
const seconds = computed(() => String(Math.floor(timestamp.value / 1000) % 60).padStart(2, '0'))

watch(
  () => $props.status,
  (status) => {
    if (status !== 'playing') {
      pause()
    }
  }
)
</script>
