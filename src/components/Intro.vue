<template>
  <h1
    class="mb-3 text-5xl font-bold transition-colors duration-250 ease-in-out"
    :class="{
      'text-blue-500': [5, 6].includes(size),
      'text-sky-500': [7, 8].includes(size),
      'text-teal-500': [9, 10].includes(size),
      'text-green-500': [11, 12].includes(size),
      'text-lime-500': [13, 14].includes(size),
      'text-amber-500': [15, 16].includes(size),
      'text-orange-500': [17, 18].includes(size),
      'text-red-500': [19, 20].includes(size),
    }"
  >
    DEMINE
  </h1>
  <IntroSize v-model="size" class="mt-4 mb-3" v-bind="$attrs" />
  <button class="button min-w-25" @click="$emit('start')">Start The Game</button>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: number
}

const $props = defineProps<Props>()
const $emit = defineEmits(['update:modelValue', 'start'])

const size = computed({
  set(value: number) {
    $emit('update:modelValue', value)
  },
  get() {
    return $props.modelValue
  },
})
</script>

<style>
.title-animation {
  letter-spacing: 0.25em;
}

.title-animation > span {
  display: inline-block;
  transform: translateX(-20px);
  animation-name: title-animation;
  animation-duration: 0.5s;
  /* animation-iteration-count: infinite; */
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.title-animation > span:nth-child(2) {
  animation-delay: 0.25s;
}
.title-animation > span:nth-child(3) {
  animation-delay: 0.5s;
}
.title-animation > span:nth-child(4) {
  animation-delay: 0.75s;
}
.title-animation > span:nth-child(5) {
  animation-delay: 1s;
}
.title-animation > span:nth-child(6) {
  animation-delay: 1.25s;
}
.title-animation > span:nth-child(7) {
  animation-delay: 1.5s;
}

@keyframes title-animation {
  100% {
    transform: translateX(0);
  }
}
</style>
