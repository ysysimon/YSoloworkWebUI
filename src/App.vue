<template>
  <div>
    <el-config-provider :locale="locale" :button="{ autoInsertSpace: true }">
      <div class="lang">
        <el-button size="small" text @click="changeLanguage('zhCn')">中文</el-button>
        <el-button size="small" text @click="changeLanguage('enUs')">English</el-button>
      </div>
      <Login />
      <!-- {{ isDark }}
      <button @click="toggleDarkMode">Toggle Dark Mode</button> -->
    </el-config-provider>
  </div>
</template>

<script setup>
import Login from './view/Login.vue'
import { useDark, useToggle } from '@vueuse/core'

import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const { locale } = useI18n();
function changeLanguage(lang) {
  locale.value = lang;
}

const isDark = useDark(true)
//const toggleDark  = useToggle(isDark)


function toggleDarkMode() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

</script>

<style scoped>
.lang{
  position: fixed;
  right: 0%;
}
.lang .el-button{
  margin: 0;
}
</style>