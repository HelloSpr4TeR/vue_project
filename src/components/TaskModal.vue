<template>
  <div class="modal" @click="closeModal">
    <!-- stop-propagation внутри формы -->
    <div @click.stop>
      <TaskForm @create="handleCreate" />
    </div>
  </div>
</template>

<script setup>
import TaskForm from './TaskForm.vue'

const emit = defineEmits(['create', 'close'])

const closeModal = (e) => {
  // Закрываем только при клике на фон
  if (e.target === e.currentTarget) emit('close')
}

// Обработчик создания задачи
const handleCreate = (task) => {
  emit('create', task)
  emit('close') // закрываем модалку после создания
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
