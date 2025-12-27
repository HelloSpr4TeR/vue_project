<template>
  <div>
    <ul v-if="characters.length > 0">
      <li v-for="character in characters" :key="character.id">
        <h4>Имя: {{ character.name }}</h4>
        <p>Статус: {{ character.status }}</p>
        <p>Вид: {{ character.species }}</p>
      </li>
    </ul>
    <div v-else-if="error">Ошибка: {{ error }}</div>
    <div v-else>Здесь пока что пусто</div>
    <div class="observe" ref="lastElem"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'

const characters = reactive([])
const error = ref(null)
const page = ref(1)
const pages = ref(0)
const load = ref(false)
let observer = null
const lastElem = ref(null)

const fetchCharacters = async (page) => {
  try {
    load.value = true
    const res = await fetch(`http://rickandmortyapi.com/api/character?page=${page}`)
    if (!res.ok) {
      throw new Error('Ошибка')
    }
    const data = await res.json()
    characters.push(...data.results)
    pages.value = data.info.pages
  } catch (e) {
    error.value = e.message
  } finally {
    load.value = false
  }
}

onMounted(() => {
  setTimeout(() => {
    fetchCharacters(page.value)
  }, 1000)
})

watch(page, () => {
  fetchCharacters(page.value)
})

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (!load.value && entries[0].isIntersecting && page.value < pages.value) {
      page.value++
    }
  })

  const el = lastElem.value
  if (el) observer.observe(el)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  observer = null
})
</script>

<style lang="scss" scoped>
.observe {
  height: 10px;
  background-color: blue;
}
</style>
