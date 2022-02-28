<template>
  <div
    class="grid gap-1"
    :style="{ 'grid-template-columns': `repeat(${cols}, 1fr)` }"
    v-bind="$attrs"
  >
    <div v-for="(cell, index) in blocks" :key="index">
      <button
        class="tile transition-colors duration-50 ease-linear"
        :class="{ 'tile-hole': cell.isRevealed && !cell.isMine && cell.mineCount === 0 }"
        :disabled="cell.isRevealed || status !== 'playing'"
        @click="open(index)"
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
          <span v-if="cell.isMine">💣</span>
          <span v-else-if="cell.mineCount > 0">{{ cell.mineCount }}</span>
        </template>
      </button>
    </div>
  </div>
  <div v-if="status !== 'playing'" class="mt-5">
    <button class="restart-button" @click="restart">Restart Game</button>
  </div>
  <div class="mt-5">
    <div>
      <span>Game Status: </span>
      <strong v-if="status === 'won'" class="text-emerald-600">You Won!</strong>
      <strong v-else-if="status === 'lost'" class="text-rose-500">Game Over!</strong>
      <strong v-else class="text-pink-500">Playing</strong>
    </div>
    <div class="mt-1">
      <span>Flags: </span>
      <strong class="text-indigo-500">{{ flagsCount }}/{{ minesCount }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import { initDemine } from '~/composables'

interface Props {
  rows: number
  cols: number
}

const $props = defineProps<Props>()
const { rows, cols } = toRefs($props)
const { blocks, minesCount, flagsCount, status, open, flag, restart } = initDemine(
  rows.value,
  cols.value
)
</script>
