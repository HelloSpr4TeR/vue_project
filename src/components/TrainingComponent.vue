<template>
  <div>
    <input v-model="searchUser" placeholder="Найти пользователя" />
    <form @submit.prevent="createUser">
      <input v-model="name" placeholder="Введите имя" />
      <input v-model="userName" placeholder="Введите логин" />
      <button :disabled="!dis">Создать пользователя</button>
    </form>
    <ul v-if="searchUsers.length">
      <li v-for="user in searchUsers" :key="user.id">
        <h3>Номер id: {{ user.id }}</h3>
        <p>Имя: {{ user.name }}</p>
        <p>Логин: {{ user.username }}</p>
        <button @click="deleteUser(user.id)">Удалить пользователя</button>
      </li>
    </ul>
    <div v-if="error">Ошибка</div>
    <div v-if="isLoad">Загрузка</div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
const users = ref([])
const error = ref(null)
const isLoad = ref(false)
const name = ref('')
const userName = ref('')
const searchUser = ref('')

let controller

onMounted(() => {
  controller = new AbortController()

  const fetchUsers = async () => {
    isLoad.value = true
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
        signal: controller.signal,
      })
      if (!res.ok) {
        throw new Error('Ошибка запроса')
      }
      const data = await res.json()
      users.value.unshift(...data)
    } catch (e) {
      if (e.name === 'AbortError') {
        error.value = e.name
        console.log('Запрос отменен')
      } else {
        error.value = e
      }
    } finally {
      isLoad.value = false
    }
  }

  fetchUsers()
})

onUnmounted(() => {
  if (controller) controller.abort()
})

const createUser = () => {
  users.value.unshift({ id: Date.now(), name: name.value, username: userName.value })
  name.value = ''
  userName.value = ''
}

const deleteUser = (id) => {
  users.value = users.value.filter((user) => user.id !== id)
}

const dis = computed(() => name.value && userName.value)

const searchUsers = computed(() => {
  if (!searchUser.value) return users.value
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(searchUser.value.toLowerCase()),
  )
})
</script>

<style lang="scss" scoped></style>
