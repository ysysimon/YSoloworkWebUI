import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'element-plus/theme-chalk/dark/css-vars.css' //for dark mode
import './styles/dark/css-vars.css'  //for dark mode

import { createI18n } from 'vue-i18n'
import { messages } from './translate.js'

// 创建 i18n 实例
const i18n = createI18n({
    locale: 'enUs', // 设置默认语言
    messages, // 设置翻译
    legacy: false, 
    allowComposition: true
  });

createApp(App).use(i18n).mount('#app')
