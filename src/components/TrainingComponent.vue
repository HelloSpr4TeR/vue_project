<template>
  <div class="container">
    <input v-model="name" placeholder="Введите имя персонажа" />
    <div v-if="isLoad">Загрузка</div>
    <div v-else-if="error">Ошибка: {{ error }}</div>
    <ul v-else-if="characters.length > 0">
      <li v-for="character in characters" :key="character.id">
        <p>Имя: {{ character.name }}</p>
      </li>
      <p>Страниц: {{ pages }}</p>
      <button style="cursor: pointer" :disabled="page === 1" @click="clickPage('prev')">
        Предыдущая страница
      </button>
      <button style="cursor: pointer" :disabled="page === pages" @click="clickPage">
        Следующая страница
      </button>
    </ul>
    <div class="pagin">
      <p
        class="page"
        :class="{ active: pag === page }"
        @click="page = pag"
        v-for="pag in pagin()"
        :key="pag"
      >
        {{ pag }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref, watch } from 'vue'

const characters = ref([])
const error = ref(null)
const isLoad = ref(false)
const name = ref('')
const page = ref(1)
const pages = ref(0)

let controller
let id = null

const fetchCharacters = async (name, page, signal) => {
  error.value = null
  isLoad.value = true
  try {
    const res = await fetch(
      `http://rickandmortyapi.com/api/character?name=${name}&page=${page}`,
      signal,
    )
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Персонаж не найден')
      }
      throw new Error('Ошибка')
    }
    const data = await res.json()
    characters.value = []
    characters.value.push(...data.results)
    pages.value = data.info.pages
  } catch (e) {
    if (e.message === 'AbortError') {
      console.log('Запрос был отменен')
    }
    error.value = e.message
  } finally {
    isLoad.value = false
  }
}

watch(
  [name, page],
  () => {
    clearTimeout(id)
    id = null
    id = setTimeout(() => {
      if (controller) controller.abort()

      controller = new AbortController()
      fetchCharacters(name.value, page.value, { signal: controller.signal })
    }, 500)
  },
  { immediate: true },
)

onUnmounted(() => {
  clearTimeout(id)
  id = null
  if (controller) controller.abort()
})

watch(name, () => {
  page.value = 1
})

const clickPage = (p) => {
  if (p === 'prev') page.value--
  else page.value++
}

const pagin = () => {
  const total = pages.value
  const current = page.value
  const res = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) res.push(i)
    return res
  }

  res.push(1)

  if (current > 4) res.push('...')

  let start = Math.max(2, current - 1)
  let end = Math.min(total - 1, current + 1)

  if (current <= 4) {
    start = 2
    end = 5
  } else if (current >= total - 3) {
    start = total - 4
    end = total - 1
  }

  for (let i = start; i <= end; i++) res.push(i)

  if (current < total - 3) res.push('...')

  res.push(total)

  return res
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagin {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  gap: 2px;
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px blue solid;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.page.active {
  border: 3px red solid;
  height: 30px;
}
</style>
