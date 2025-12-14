<template>
  <div class="counter-container">
    <p>Счетчик: {{ count }}</p>
    <button @click="increment">Нажми меня</button>
    <p>Текст инпута: {{ text }}</p>
    <input v-model="text" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// создаем реактивную переменную count
const count = ref(0)
const text = ref('')

// функция для увеличения счетчика
const increment = () => {
  count.value++
}
</script>

<style lang="scss" scoped>
.counter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  p {
    font-size: 20px;
    font-weight: bold;
  }

  button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #ff7875;
    }
  }
}
</style>
