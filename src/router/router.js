import { createWebHistory, createRouter } from 'vue-router'
import store from "@/store";
const routes = [
  { path: '/', redirect: { name: 'dashboard' } },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/home/DashboardView.vue'),
    meta: {
      title: 'Dashboard',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/home/pageNotFound.vue'),
    meta: {
      title: 'pageNotFound',
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
