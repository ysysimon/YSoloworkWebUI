<template>
  <div>
    <el-config-provider :locale="elLocale" :button="{ autoInsertSpace: true }">
      <!-- 语言选择 -->
      <div class="lang">
        <el-dropdown>
          <el-icon size="20">
            <Setting />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeLanguage('zhCn')">中文</el-dropdown-item>
              <el-dropdown-item @click="changeLanguage('enUs')">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup>
import {
  Setting,
} from '@element-plus/icons-vue'

import { useDark  } from '@vueuse/core';

import { useI18n } from 'vue-i18n'
const { t } = useI18n();
import enLocale from 'element-plus/es/locale/lang/en'
import zhCnLocale from 'element-plus/es/locale/lang/zh-cn'
import { useAuthStore } from './stores/auth'
import { useSettingStore } from './stores/setting'
import { ElMessage } from 'element-plus'

import { ref, onMounted } from 'vue';


// 初始化store
const authStore = useAuthStore();
authStore.initializeStore();
const settingStore = useSettingStore();

const elementPlusLocales = {
  enUs: enLocale,
  zhCn: zhCnLocale,
};

const elLocale = ref(enLocale);
const { locale } = useI18n();
function changeLanguage(lang, notify = true) {
  locale.value = lang;  // 更改 Vue I18n 的语言
  elLocale.value = lang === 'enUs' ? enLocale : zhCnLocale;
  settingStore.setting["lang"] = lang
  settingStore.saveSetting2localStorage()
  if (notify) {
    ElMessage(t('message.langSwitch'))
  }
}


onMounted(() => {
  changeLanguage(settingStore.setting["lang"], false)
});


// 设置为暗模式
localStorage.setItem('vueuse-color-scheme','dark');
useDark()

//const toggleDark  = useToggle(isDark)


// function toggleDarkMode() {
//   isDark.value = !isDark.value;
//   if (isDark.value) {
//     document.body.classList.add('dark');
//   } else {
//     document.body.classList.remove('dark');
//   }
// }

</script>

<style scoped>
.lang {
  position: fixed;
  right: 2%;
  top: 2%;
  z-index: 10;
}
</style>