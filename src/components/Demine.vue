<template>
  <h1 class="text-2xl font-bold mb-3 text-cool-gray-600 dark:text-cool-gray-400">DEMINE</h1>
  <div
    class="grid gap-1 relative"
    :style="{ 'grid-template-columns': `repeat(${cols}, 1fr)` }"
    v-bind="$attrs"
  >
    <div v-for="(cell, index) in blocks" :key="index">
      <button
        class="tile transition-colors duration-50 ease-linear"
        :class="{
          'tile-hole': isHole(cell),
          'tile-checked': isSatisfied(cell),
          '!tile-mine': isMine(cell),
        }"
        :disabled="cell.isRevealed || status !== 'playing'"
        @click="openTile(index)"
        @contextmenu="flag($event, index)"
      >
        <template v-if="cell.isRevealed && cell.isFlagged">
          <span v-if="cell.isMine">✔️</span>
          <span v-else>❌</span>
        </template>
        <template v-else-if="cell.isFlagged">
          <span>🚩</span>
        </template>
        <template v-else-if="cell.isRevealed">
          <template v-if="cell.isMine">
            <span v-if="lastIndex === index">💥</span>
            <span v-else>💣</span>
          </template>
          <span v-else-if="cell.mineCount > 0">{{ cell.mineCount }}</span>
        </template>
      </button>
    </div>
    <div v-if="status === 'won'" class="won"><span>You Won</span></div>
  </div>
  <DemineInfo
    class="mt-6 w-40"
    :flags-count="flagsCount"
    :mines-count="minesCount"
    :status="status"
  />
  <button class="button mt-2 w-40" @click="$emit('restart')">restart</button>
</template>

<script setup lang="ts">
import { initDemine } from '~/composables'
import { Block } from '~/types'

interface Props {
  rows: number
  cols: number
}

const $emit = defineEmits(['restart'])
const $props = defineProps<Props>()
const { rows, cols } = toRefs($props)
const { blocks, minesCount, flagsCount, status, open, flag } = initDemine(rows.value, cols.value)

const lastIndex = ref(-1)
const openTile = (index: number) => {
  lastIndex.value = index
  open(index)
}

const isMine = (cell: Block) => cell.isRevealed && cell.isMine
const isHole = (cell: Block) => cell.isRevealed && !cell.isMine && cell.mineCount === 0
const isSatisfied = (cell: Block) =>
  // eslint-disable-next-line prettier/prettier
  (cell.isRevealed && cell.flagCount >= cell.mineCount && cell.flagCount !== 0 && !cell.isFlagged) ||
  (!cell.isRevealed && cell.isFlagged)
</script>
