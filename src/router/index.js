import { createRouter, createWebHistory } from 'vue-router'
import HomeCard from '../views/HomeCard.vue';
import ConFirm from '../views/ConFirm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeCard,
    },
    {
      path: '/confirm', // เพิ่ม path สำหรับ ConFirm.vue
      name: 'confirm',
      component: ConFirm,
    },
  ]
})

export default router
