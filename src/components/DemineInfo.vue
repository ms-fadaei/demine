<template>
  <div class="flex">
    <div class="text-lg basis-full flex items-center">
      <MineSvg class="w-6 h-6 inline-block mr-1 text-red-500/85" />
      <strong class="text-red-500">{{ minesCount - flagsCount }}</strong>
    </div>
    <div class="text-lg basis-auto flex items-center">
      <ClockSvg class="w-5 h-5 inline-block mr-2 text-blue-500/85" />
      <strong class="text-blue-500"> {{ timer }} </strong>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MineSvg from '~/assets/mine.svg'
import ClockSvg from '~/assets/clock.svg'

interface Props {
  flagsCount: number
  minesCount: number
  timer: string
}

defineProps<Props>()
</script>
