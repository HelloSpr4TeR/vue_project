<template>
  <div class="view_container" ref="container">
    <!-- Фейковый контейнер, задаёт реальный scrollHeight -->
    <div :style="{ height: totalHeight + 'px', position: 'relative', width: '100%' }">
      <!-- Виртуальные элементы -->
      <div
        class="view_item"
        v-for="post in visiblePosts"
        :key="post.id"
        :style="{ top: post._top + 'px', position: 'absolute', width: '100%' }"
      >
        <h3>Номер: {{ post.id }}</h3>
        <h4>Название: {{ post.title }}</h4>
        <p>Описание: {{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const posts = ref([])
const visiblePosts = ref([])
const container = ref(null)

// Плотнее: уменьшенная высота элемента и буфер
const itemHeight = 120 // уменьшили с 150
const buffer = 2 // уменьшили буфер

let totalHeight = 0
let ticking = false

// Загрузка данных
const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await res.json()
  posts.value = data
  totalHeight = posts.value.length * itemHeight

  await nextTick()
  updateVisiblePosts()
}

// Обновление видимых элементов
const updateVisiblePosts = () => {
  if (!container.value) return

  const scrollTop = container.value.scrollTop
  const containerHeight = container.value.clientHeight

  const visibleCount = Math.ceil(containerHeight / itemHeight)

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer)
  const endIndex = Math.min(posts.value.length, startIndex + visibleCount + buffer * 2)

  visiblePosts.value = posts.value.slice(startIndex, endIndex).map((post, idx) => ({
    ...post,
    _top: (startIndex + idx) * itemHeight,
  }))
}

// Throttle scroll через requestAnimationFrame
const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateVisiblePosts()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  fetchPosts()
  container.value.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  container.value.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.view_container {
  height: 500px; /* фиксированная высота контейнера */
  width: 800px;
  overflow-y: auto;
  border: 2px solid red;
  position: relative;
}

.view_item {
  height: 120px; /* уменьшили с 150 */
  border: 2px solid orange;
  box-sizing: border-box;
  padding: 5px;
}
</style>
