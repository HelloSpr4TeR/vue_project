<template>
  <div>
    <h1>Счетчик: {{ count }}</h1>
    <h2>Таймер: {{ time }}</h2>
    <button v-if="time > 0" @click="handleClick">Кнопка</button>
    <div style="height: 1500px"></div>
    <!-- для скролла -->
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
const count = ref(0)
const time = ref(10)
const timeRef = ref(null)

const startTimer = () => {
  if (timeRef.value !== null) return
  timeRef.value = setInterval(() => {
    if (time.value === 0) {
      window.removeEventListener('scroll', handleClick)
      clearInterval(timeRef.value)
      timeRef.value = null
      return 0
    }
    return time.value--
  }, 1000)
}

const handleClick = () => {
  count.value++
  startTimer()
}

onMounted(() => {
  window.addEventListener('scroll', handleClick)
})

onUnmounted(() => {
  if (timeRef.value !== null) clearInterval(timeRef.value)
  window.removeEventListener('scroll', handleClick)
})
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 0.8rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1,
h2 {
  margin: 0.5rem 0;
  color: #333;
}

h1 {
  font-size: 1.8rem;
}

h2 {
  font-size: 1.4rem;
  color: #555;
}

button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.1s ease;
}

button:hover {
  background: #0056b3;
}

button:active {
  transform: scale(0.97);
}
</style>
