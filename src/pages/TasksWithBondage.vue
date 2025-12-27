<template>
  <div class="container">
    <!-- Фильтры -->
    <div class="task_filter">
      <input v-model="search" placeholder="Найти задачу" />

      <label>
        Показать с бандажом
        <input type="checkbox" v-model="filtBond" />
      </label>

      <select v-model="options">
        <option value="">Все</option>
        <option value="compl">Выполненные</option>
        <option value="not compl">Не выполненные</option>
      </select>
    </div>

    <!-- Кнопка открытия модалки -->
    <button class="button_modal" @click="openFlag = true">Создать задачу</button>

    <!-- Модалка через Teleport -->
    <Teleport to="body">
      <TaskModal v-if="openFlag" @create="createTask" @close="openFlag = false" />
    </Teleport>

    <!-- Список задач -->
    <TasksList :tasks="filteredTasks" @delete="deleteTask" @toggle="toggleTask" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import TaskModal from '@/components/TaskModal.vue'
import TasksList from '@/components/TasksList.vue'

const tasks = ref([]) // массив задач
const search = ref('') // поиск по имени
const options = ref('') // фильтр выполнено/не выполнено
const filtBond = ref(false) // фильтр бандаж
const openFlag = ref(false) // флаг модалки

// Загружаем задачи из localStorage
const savedTasks = localStorage.getItem('tasks')
tasks.value = savedTasks ? JSON.parse(savedTasks) : []

// Сохраняем изменения в localStorage
watch(
  tasks,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  },
  { deep: true },
)

// Создание новой задачи через модалку
const createTask = (task) => {
  tasks.value.unshift({
    id: Date.now(),
    name: task.name,
    descr: task.descr,
    bondage: task.bondage,
    checked: false,
  })
}

// Удаление задачи
const deleteTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

// Переключение состояния выполнено/не выполнено
const toggleTask = (id) => {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.checked = !task.checked
}

// Вычисление фильтрованных задач
const filteredTasks = computed(() => {
  let filtered = tasks.value

  if (options.value === 'compl') filtered = filtered.filter((t) => t.checked)
  if (options.value === 'not compl') filtered = filtered.filter((t) => !t.checked)
  if (search.value)
    filtered = filtered.filter((t) => t.name.toLowerCase().includes(search.value.toLowerCase()))
  if (filtBond.value) filtered = filtered.filter((t) => t.bondage)

  return filtered
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  border: 3px red solid;
  border-radius: 10px;
}
.task_filter {
  display: flex;
  border: 3px red solid;
  border-radius: 10px;
  margin: 10px;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px;
  width: 700px;
}
.task_create {
  display: flex;
  border: 3px red solid;
  border-radius: 10px;
  margin: 10px;
  justify-content: space-between;
  gap: 20px;
  padding: 10px;
  align-items: center;
  width: 700px;
}
.button_modal {
  color: white;
  background-color: #e74c3c;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  transition:
    background 0.3s ease,
    transform 0.2s ease;
}

.button_modal:hover {
  background-color: red;
  transform: scale(1.05);
}

.button_modal:active {
  transform: scale(0.95);
}
</style>
