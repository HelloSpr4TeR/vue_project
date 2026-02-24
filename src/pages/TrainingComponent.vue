<template>
  <div>
    <div v-if="load">Загрузка...</div>
    <MyTable v-else-if="data" :dataTable="data" @func="handleClick" />
    <div v-else>Данные отсутствуют</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import MyTable from './MyTable.vue'

const data = ref([])
const load = ref(false)
const url = `https://jsonplaceholder.typicode.com/users`

onMounted(() => {
  const fetchData = async (u) => {
    load.value = true
    try {
      const res = await fetch(u)
      if (!res.ok) {
        throw new Error('Ошибка')
      }
      data.value = await res.json()
    } catch (e) {
      console.log(e.message)
    } finally {
      load.value = false
    }
  }

  fetchData(url)
})

const handleClick = (prop) => {
  console.log(`Получил из дочернего ${prop}`)
}
</script>

<style lang="scss" scoped></style>
