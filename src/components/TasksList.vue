<template>
  <ul class="task_list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @delete="$emit('delete', $event)"
      @toggle="$emit('toggle', $event)"
    />
  </ul>
</template>

<script setup>
import TaskItem from './TaskItem.vue'
defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})
</script>

<style>
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
  margin-bottom: 5px;
}
</style>
