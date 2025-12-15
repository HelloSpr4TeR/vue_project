import { createRouter, createWebHistory } from 'vue-router'
import PostsList from '@/components/PostsList.vue'
import TasksWithBondage from '@/components/TasksWithBondage.vue'
import TrainingComponent from '@/components/TrainingComponent.vue'
import CountTimer from '@/components/CountTimer.vue'

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
  {
    path: '/count',
    name: 'count',
    component: CountTimer,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
