import { createRouter, createWebHistory } from 'vue-router'
// 在路由配置中
import ImageTraining from '../views/ImageTraining.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard'  // 重定向到dashboard
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/imageTraining',
      name: 'imageTraining',
      component: ImageTraining,  // 添加.vue扩展名
    },
    {
      path: '/speaker-training',
      name: 'speakerTraining',
      component: () => import('../views/SpeakerTraining.vue'),
    },
    {
      path: '/video-generation',
      name: 'videoGeneration',
      component: () => import('../views/VideoGeneration.vue'),
    },
    {
      path: '/agent-management',
      name: 'agentManagement',
      component: () => import('../views/AgentManagement.vue'),
    },
  ],
})

export default router
