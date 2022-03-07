<template>
  <div class="flex">
    <div class="text-sm basis-full">
      <span>Flags: </span>
      <strong class="text-indigo-500">{{ flagsCount }}/{{ minesCount }}</strong>
    </div>
    <div class="text-sm basis-auto">
      <strong class="text-orange-500"> {{ minutes }}:{{ seconds }} </strong>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
