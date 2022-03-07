<template>
  <main
    font-sans
    class="flex flex-col h-screen justify-center items-center"
    un-bg="slate-50 dark:slate-900"
    un-text="gray-700 dark:gray-200"
  >
    <DemineRoot class="normal-bg" :rows="10" :cols="10" />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

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
