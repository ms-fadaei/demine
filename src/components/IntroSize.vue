<template>
  <div
    class="normal-bg flex gap-1 items-center border-1 transition-colors duration-250 ease-in-out"
    :class="{
      'border-blue-500': size === 5,
      'border-sky-500': size === 6,
      'border-teal-500': size === 7,
      'border-green-500': size === 8,
      'border-lime-500': size === 9,
      'border-amber-500': size === 10,
      'border-orange-500': size === 11,
      'border-red-500': size === 12,
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
const maxSize = 12

const size = computed({
  set(value: number) {
    $emit('update:modelValue', value > maxSize ? maxSize : value < minSize ? minSize : value)
  },
  get() {
    return $props.modelValue
  },
})
</script>
