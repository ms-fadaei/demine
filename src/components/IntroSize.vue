<template>
  <div
    class="normal-bg flex gap-1 items-center transition-colors"
    :class="{
      'bg-orange-500/50': size === 5,
      'bg-orange-500/55': size === 6,
      'bg-orange-500/60': size === 7,
      'bg-orange-500/65': size === 8,
      'bg-orange-500/70': size === 9,
      'bg-orange-500/75': size === 10,
      'bg-orange-500/80': size === 11,
    }"
  >
    <button class="button !bg-light-50/35 !bg-dark-900/35" @click="size--">easier</button>
    <span class="w-20 text-center">size: {{ size }}</span>
    <button class="button !bg-light-50/35" @click="size++">harder</button>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: number
}

const $props = defineProps<Props>()
const $emit = defineEmits(['update:modelValue'])

const minSize = 5
const maxSize = 11

const size = computed({
  set(value: number) {
    $emit('update:modelValue', value > maxSize ? maxSize : value < minSize ? minSize : value)
  },
  get() {
    return $props.modelValue
  },
})
</script>
