<template>
  <li class="task_item">
    <h4>Название задачи: {{ task.name }}</h4>
    <p>Описание задачи: {{ task.descr }}</p>

    <div class="footer_item">
      <p>Наличие бандажа: {{ task.bondage ? 'Есть' : 'Нет' }}</p>

      <div>
        Выполнено:
        <input type="checkbox" :checked="task.checked" @change="toggle" />
      </div>

      <button class="button_task" @click="deleteTask">Удалить</button>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete', 'toggle'])

const deleteTask = () => {
  emit('delete', props.task.id)
}

const toggle = () => {
  emit('toggle', props.task.id)
}
</script>

<style>
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
