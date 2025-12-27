<template>
  <form class="task_create" @submit.prevent="createTask">
    <input v-model="taskName" placeholder="Название задачи" />
    <textarea v-model="taskDescr" placeholder="Описание задачи"></textarea>
    <div>
      Указать наличие бандажа:
      <input type="checkbox" v-model="isBondage" />
    </div>
    <button class="button_task" :disabled="!canCreateTask">Создать задачу</button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['create'])

const taskName = ref('')
const taskDescr = ref('')
const isBondage = ref(false)

const canCreateTask = computed(() => taskName.value.trim() && taskDescr.value.trim())

const createTask = () => {
  emit('create', {
    name: taskName.value,
    descr: taskDescr.value,
    bondage: isBondage.value,
  })

  // Сброс формы
  taskName.value = ''
  taskDescr.value = ''
  isBondage.value = false
}
</script>

<style scoped>
.task_create {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid red;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  background-color: #fff;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
