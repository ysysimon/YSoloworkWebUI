import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth'

// 定义路由规则，每个路由应该映射到一个组件
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../view/Home.vue'),
    meta: { requiresAuth: true },
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
})

//路由守卫
router.beforeEach((to, from, next) => {
  // 你的导航守卫逻辑
  const goingToLoginPage = to.path === '/login'
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' }) // 重定向到登录页
  } else if (goingToLoginPage && authStore.isAuthenticated) {
    // 如果用户已登录且尝试访问登录页面，重定向到 /home
    next('/home')
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
