<template>
  <main
    font-sans
    class="flex flex-col h-screen justify-center items-center"
    un-bg="slate-50 dark:slate-900"
    un-text="gray-700 dark:gray-200"
  >
    <Intro v-if="step === 0" v-model="size" class="normal-bg" @start="step = 1" />
    <Demine v-else class="normal-bg" :rows="size" :cols="size" @restart="step = 0" />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

const step = ref(0)
const size = ref(5)

useHead({
  title: 'Demine',
  meta: [
    {
      name: `description`,
      content: `A simple implementation of the old but gold Minesweeper game.`,
    },
  ],
})
</script>
