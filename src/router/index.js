import { createRouter, createWebHistory } from 'vue-router'
import PostsList from '@/pages/PostsList.vue'
import UsersList from '@/pages/UsersList.vue'
import TasksWithBondage from '@/pages/TasksWithBondage.vue'
import TrainingComponent from '@/pages/TrainingComponent.vue'
import CountTimer from '@/pages/CountTimer.vue'
import CharactersList from '@/pages/CharactersList.vue'
import CharactersLazy from '@/pages/CharactersLazy.vue'
import PostsVirtualized from '@/pages/PostsVirtualized.vue'

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
  {
    path: '/users',
    name: 'users',
    component: UsersList,
  },
  {
    path: '/characters',
    name: 'characters',
    component: CharactersList,
  },
  {
    path: '/lazy',
    name: 'lazy',
    component: CharactersLazy,
  },
  {
    path: '/virtual',
    name: 'virtual',
    component: PostsVirtualized,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
