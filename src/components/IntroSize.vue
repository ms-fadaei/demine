<template>
  <div
    class="normal-bg flex gap-1 items-center border-1 transition-colors duration-250 ease-in-out"
    :class="{
      'border-blue-500': [5, 6].includes(size),
      'border-sky-500': [7, 8].includes(size),
      'border-teal-500': [9, 10].includes(size),
      'border-green-500': [11, 12].includes(size),
      'border-lime-500': [13, 14].includes(size),
      'border-amber-500': [15, 16].includes(size),
      'border-orange-500': [17, 18].includes(size),
      'border-red-500': [19, 20].includes(size),
    }"
  >
    <button class="button" @click="size--">easier</button>
    <span class="w-20 text-center">{{ size }}</span>
    <button class="button" @click="size++">harder</button>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: number
}

const $props = defineProps<Props>()
const $emit = defineEmits(['update:modelValue'])

const minSize = 5
const maxSize = 20

const size = computed({
  set(value: number) {
    $emit('update:modelValue', value > maxSize ? maxSize : value < minSize ? minSize : value)
  },
  get() {
    return $props.modelValue
  },
})
</script>
