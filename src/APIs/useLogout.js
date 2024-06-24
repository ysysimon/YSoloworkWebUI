import axios from 'axios'
import { ref } from 'vue'

import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

import { useI18n } from 'vue-i18n'

import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/auth'

import { useTabStore } from '../stores/tab'

export function useLogout() {
  const isLoading = ref(false)
  const error = ref(null)
  const { t } = useI18n()
  const loginUrl = import.meta.env.VITE_API_URL // 使用环境变量

  const router = useRouter()
  const store = useAuthStore()
  const tabStore = useTabStore()

  const logout = async () => {
    isLoading.value = true
    error.value = null
    let loadingInstance = null

    try {
      loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: t('message.requesting'),
      }) // 启动加载动画
      const response = await axios
        .post(loginUrl + '/api/auth/logout')
        .then((response) => {
          // console.log('登出成功:', response); // for debug
          if (response.status === 200) {
            console.log('登出成功:')
          }
        })
    } catch (err) {
      console.error('登出失败:', err.response || err)
      error.value = err.response || err
      // 在这里处理后端不在线逻辑
      ElMessage.error(t('message.logout_failed'))
    } finally {
      // 不管服务端是否在线，都清除 Token
      store.clearToken()
      store.clearUser()
      // tabStore.clearActiveTab();
      // tabStore.clearTabs();
      //路由跳转
      router.push('/login')
      isLoading.value = false
      if (loadingInstance) {
        loadingInstance.close() // 关闭加载动画
      }
    }
  }

  return { logout, isLoading, error }
}
