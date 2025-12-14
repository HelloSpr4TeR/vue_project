<template>
  <div class="container">
    <h2>Список постов</h2>

    <div>
      <select v-model.number="limit">
        <option disabled>Выбрать лимит</option>
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="totalPosts">Все</option>
      </select>

      <ul class="postsList">
        <li class="postItem" v-for="post in posts" :key="post.id">
          <h3>{{ post.id }}: {{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>

      <div v-if="loading">Загрузка...</div>
      <div v-if="error">Ошибка: {{ error }}</div>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px">
      <p
        v-for="page in totalPages"
        :key="page"
        @click="curPage = page"
        :style="{
          border: page === curPage ? '2px solid red' : '1px solid green',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
        }"
      >
        {{ page }}
      </p>
    </div>

    <input v-model.number="num" type="number" />
    <button class="buttonGo" @click="goToPage">Перейти</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'

const posts = ref([])
const loading = ref(false)
const error = ref(null)
const limit = ref(10)
const curPage = ref(1)
const num = ref('')
const totalPosts = ref(0)

async function fetchPosts() {
  loading.value = true
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit.value}&_page=${curPage.value}`,
    )
    if (!res.ok) throw new Error('Ошибка сети')
    totalPosts.value = Number(res.headers.get('x-total-count'))
    posts.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const totalPages = computed(() => {
  return Math.ceil(totalPosts.value / limit.value)
    ? Array.from({ length: Math.ceil(totalPosts.value / limit.value) }, (_, i) => i + 1)
    : []
})

function goToPage() {
  if (num.value >= 1 && num.value <= totalPages.value.length) {
    curPage.value = num.value
    num.value = ''
  }
}

onMounted(fetchPosts)
watch([limit, curPage], fetchPosts)
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  border: 3px green solid;
  border-radius: 5px;
  padding: 20px;
}

.postsList {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.postItem {
  border: 3px green solid;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  margin: 10px 0;
}

.buttonGo {
  background-color: green;
  border: 1px green solid;
  border-radius: 3px;
  margin: 3px;
  padding: 5px;
  cursor: pointer;
}
</style>
