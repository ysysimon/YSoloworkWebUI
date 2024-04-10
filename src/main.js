import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css' //for dark mode

// Element Plus 语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import enUs from 'element-plus/es/locale/lang/en'

import { createI18n } from 'vue-i18n'
import { messages } from './translate.js'

// 创建 i18n 实例
const i18n = createI18n({
    locale: 'enUs', // 设置默认语言
    messages, // 设置翻译
    legacy: false, 
    allowComposition: true
  });

// router
import router from './router';

//store
import { createPinia } from 'pinia';

// axios 拦截器
import axios from 'axios';
import { useAuthStore } from './stores/auth';
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const Authstore = useAuthStore();
    config.headers['Authorization'] = 'Bearer ' + Authstore.token;
    // console.log("header token", config.headers['Authorization']) // for debug
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

const app = createApp(App).use(ElementPlus, {
  locale: enUs,
}).use(i18n).use(router).use(createPinia()).mount('#app')
