<template>
  <div class="grid gap-1 grid-template" v-bind="$attrs">
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
  <div class="mt-5">
    <div>
      <span>Game Status: </span>
      <strong v-if="status === 'won'" class="text-emerald-600">You Won!</strong>
      <strong v-else-if="status === 'lost'" class="text-rose-500">You Lost!</strong>
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
const { blocks, minesCount, flagsCount, status, open, flag } = initDemine(rows.value, cols.value)
</script>

<style>
.grid-template {
  grid-template-columns: repeat(v-bind(cols), minmax(min-content, max-content));
  grid-template-rows: repeat(v-bind(rows), minmax(min-content, max-content));
}
</style>
