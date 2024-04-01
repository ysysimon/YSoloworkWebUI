import { createRouter, createWebHistory } from 'vue-router';

// 定义路由规则，每个路由应该映射到一个组件
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../view/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../view/Home.vue'),
    meta: { requiresAuth: true }
  }

];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
  // 你的导航守卫逻辑
  // 比如，检查某些路由是否需要用户登录
  if (to.meta.requiresAuth && !isUserLoggedIn()) {
    next({ name: 'Login' }); // 重定向到登录页
  } else {
    next(); // 确保一定要调用 next()
  }
});


export default router;
