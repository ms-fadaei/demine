<template>
  <transition-group tag="div" name="fade" class="grid gap-1 grid-template">
    <div v-for="(cell, index) in blocks" :key="index">
      <button
        class="tile"
        :class="{
          '!bg-blue-gray-200 !dark:bg-blue-gray-700':
            cell.isRevealed && cell.isEmpty && cell.mineCount === 0,
        }"
        :disabled="cell.isRevealed || status !== 'playing'"
        @click="openBlock(index)"
        @contextmenu="flagBlock($event, index)"
      >
        <template v-if="cell.isRevealed">
          <span v-if="cell.isMine">💣</span>
          <span v-else-if="cell.mineCount > 0">{{ cell.mineCount }}</span>
        </template>
        <span v-else-if="cell.isFlagged">🚩</span>
      </button>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { initDemine } from '~/composables'

interface Props {
  rows: number
  cols: number
}

const $props = defineProps<Props>()
const { rows, cols } = toRefs($props)
const { blocks, status, openBlock, flagBlock } = initDemine(rows.value, cols.value)
</script>

<style>
.grid-template {
  grid-template-columns: repeat(v-bind(cols), minmax(min-content, max-content));
  grid-template-rows: repeat(v-bind(rows), minmax(min-content, max-content));
}
</style>
