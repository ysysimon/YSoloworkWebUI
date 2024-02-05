import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css' //for dark mode
import './styles/dark/css-vars.css'  //for dark mode

// Element Plus 语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import enUs from 'element-plus/es/locale/lang/en'

import { createI18n } from 'vue-i18n'
import { messages } from './translate.js'

//引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建 i18n 实例
const i18n = createI18n({
    locale: 'enUs', // 设置默认语言
    messages, // 设置翻译
    legacy: false, 
    allowComposition: true
  });

const app = createApp(App).use(ElementPlus, {
  locale: enUs,
}).use(i18n).mount('#app')

//register icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}