import { createRouter, createWebHistory } from 'vue-router'
import PostsList from '@/components/PostsList.vue'
import TasksWithBondage from '@/components/TasksWithBondage.vue'
import TrainingComponent from '@/components/TrainingComponent.vue'

const routes = [
  {
    path: '/',
    name: 'posts',
    component: PostsList,
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksWithBondage,
  },
  {
    path: '/training',
    name: 'training',
    component: TrainingComponent,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
