<template>
  <h1 class="mb-3 text-orange-500 text-5xl font-bold">DEMINE</h1>
  <IntroSize v-model="size" class="mt-4 mb-3" />
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
