import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(newToken) {
      this.token = newToken;
      localStorage.setItem('token', newToken); // 将 token 保存在 localStorage 中
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('token'); // 清除 localStorage 中的 token
    },
    setUser(newUser){
      this.user = newUser;
      localStorage.setItem('user', JSON.stringify(newUser));
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
    },
    initializeStore() {
      const token = localStorage.getItem('token');
      const user =  JSON.parse(localStorage.getItem('user'));
      if (token) {
        this.token = token; // 从 localStorage 初始化 token
      }

      if (user) {
        this.user = user;
      }
    }
  }
});
