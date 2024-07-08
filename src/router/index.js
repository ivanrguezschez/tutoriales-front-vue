import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/tutoriales',
      name: 'tutorial-list',
      component: () => import('../components/TutorialList.vue')
    },
    {
      path: '/tutoriales/:id',
      name: 'tutorial-detail',
      component: () => import('../components/TutorialDetail.vue')
    },
    {
      path: '/add',
      name: 'tutorial-add',
      component: () => import('../components/TutorialAdd.vue')
    }
  ]
})

export default router
