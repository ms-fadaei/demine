<template>
  <h1 class="text-2xl font-bold mb-3 text-cool-gray-600 dark:text-cool-gray-400">DEMINE</h1>
  <div
    class="grid gap-1 relative max-w-full overflow-auto"
    :style="{ 'grid-template-columns': `repeat(${cols}, 1fr)` }"
    v-bind="$attrs"
  >
    <button
      v-for="(cell, index) in blocks"
      :key="index"
      class="tile transition-colors duration-50 ease-linear"
      :class="{
        'tile-hole': isHole(cell),
        'tile-checked': isSatisfied(cell),
        '!tile-mine': isMine(cell),
      }"
      :disabled="status !== 'playing'"
      @click="openTile(index)"
      @contextmenu="flagTile($event, index)"
      @dblclick="openNeighboursTile($event, index)"
    >
      <template v-if="cell.isRevealed && cell.isFlagged">
        <MineFlaggedSvg v-if="cell.isMine" />
        <HoleFlaggedSvg v-else />
      </template>
      <template v-else-if="cell.isFlagged">
        <FlagSvg />
      </template>
      <template v-else-if="cell.isRevealed">
        <template v-if="cell.isMine">
          <MineExplodedSvg v-if="lastIndex === index" />
          <MineSvg v-else />
        </template>
        <span v-else-if="cell.mineCount > 0">{{ cell.mineCount }}</span>
      </template>
    </button>
    <div v-if="status === 'won'" class="won"><span>You Won</span></div>
  </div>
  <DemineInfo
    class="mt-6 w-50"
    :flags-count="flagsCount"
    :mines-count="minesCount"
    :timer="timer"
  />
  <button class="button mt-2 w-50" @click="$emit('restart')">restart</button>
</template>

<script setup lang="ts">
import { initDemine } from '~/composables'
import { Block } from '~/types'
import MineSvg from '~/assets/mine.svg'
import FlagSvg from '~/assets/flag.svg'
import HoleFlaggedSvg from '~/assets/hole-flagged.svg'
import MineFlaggedSvg from '~/assets/mine-flagged.svg'
import MineExplodedSvg from '~/assets/mine-exploded.svg'

interface Props {
  rows: number
  cols: number
}

const $emit = defineEmits(['restart'])
const $props = defineProps<Props>()
const { rows, cols } = toRefs($props)
const { blocks, minesCount, flagsCount, status, timer, open, flag, openNeighbours } = initDemine(
  rows.value,
  cols.value
)

const lastIndex = ref(-1)
const openTile = (index: number) => {
  lastIndex.value = index
  open(index)
}

const flagTile = (event: MouseEvent, index: number) => {
  event.preventDefault()
  flag(index)
}

const openNeighboursTile = (event: MouseEvent, index: number) => {
  event.preventDefault()
  openNeighbours(index)
}

const isMine = (cell: Block) => cell.isRevealed && cell.isMine
const isHole = (cell: Block) => cell.isRevealed && !cell.isMine && cell.mineCount === 0
const isSatisfied = (cell: Block) =>
  // eslint-disable-next-line prettier/prettier
  (cell.isRevealed && cell.flagCount >= cell.mineCount && cell.flagCount !== 0 && !cell.isFlagged) ||
  (!cell.isRevealed && cell.isFlagged)
</script>
