<template>
  <div class="container">
    <div class="task_filter">
      <div>
        <input v-model="search" placeholder="Найти задачу" />
      </div>

      <div>
        Показать с бандажом
        <input type="checkbox" v-model="filtBond" />
      </div>

      <div>
        <select v-model="options">
          <option value="">Все</option>
          <option value="compl">Выполненные</option>
          <option value="not compl">Не выполненные</option>
        </select>
      </div>
    </div>
    <form class="task_create" @submit.prevent="createTask">
      <input v-model="taskName" placeholder="Название задачи" />
      <textarea v-model="taskDescr" placeholder="Описание задачи" style="margin: 5px"></textarea>
      <div>
        Указать наличие бандажа:
        <input type="checkbox" v-model="isBondage" />
      </div>
      <button class="button_task" :disabled="!canCreateTask">Создать задачу</button>
    </form>

    <ul class="task_list">
      <li class="task_item" v-for="task in filteredTasks" :key="task.id">
        <h4>Название задачи: {{ task.name }}</h4>
        <p>Описание задачи: {{ task.descr }}</p>
        <div class="footer_item">
          <p>Наличие бандажа: {{ task.bondage ? 'Есть' : 'Нет' }}</p>
          <div>
            Выполнено:
            <input type="checkbox" v-model="task.checked" />
          </div>
          <button class="button_task" @click="deleteTask(task.id)">Удалить</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const taskName = ref('')
const taskDescr = ref('')
const isBondage = ref(false)
const search = ref('')
const options = ref('')
const filtBond = ref(false)
const tasks = ref([])

const savedTasks = localStorage.getItem('tasks')
tasks.value = savedTasks ? JSON.parse(savedTasks) : []

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  },
  { deep: true },
)

const createTask = () => {
  tasks.value.unshift({
    id: Date.now(),
    name: taskName.value,
    descr: taskDescr.value,
    checked: false,
    bondage: isBondage.value,
  })
  taskName.value = ''
  taskDescr.value = ''
  isBondage.value = false
}

const canCreateTask = computed(() => taskName.value && taskDescr.value)

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

const filteredTasks = computed(() => {
  let filtered = tasks.value

  if (options.value === 'compl') filtered = filtered.filter((t) => t.checked)
  if (options.value === 'not compl') filtered = filtered.filter((t) => !t.checked)

  if (search.value) {
    filtered = filtered.filter((t) => t.name.toLowerCase().includes(search.value.toLowerCase()))
  }

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
.task_list {
  display: flex;
  flex-direction: column;
  width: 720px;
  border: 1px red solid;
  border-radius: 10px;
  box-sizing: border-box;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}
.task_item {
  display: flex;
  flex-direction: column;
  border: 3px red solid;
  border-radius: 10px;
  margin: 5px;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  width: 700px;
}
.footer_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px;
}
.button_task {
  color: white;
  background-color: #e74c3c;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.2s ease;
}

.button_task:hover {
  background-color: red;
  transform: scale(1.05);
}

.button_task:active {
  transform: scale(0.95);
}
</style>
