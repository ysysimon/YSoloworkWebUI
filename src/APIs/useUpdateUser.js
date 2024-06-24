import axios from 'axios'
import { ref } from 'vue'

// import { ElLoading } from 'element-plus';
import 'element-plus/theme-chalk/el-loading.css'
import { ElMessage, ElNotification } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'

import { useI18n } from 'vue-i18n'

export function useUpdateUser() {
  const isLoading = ref(false)
  const error = ref(null)
  const { t } = useI18n()
  const API_URL = import.meta.env.VITE_BACKEND_API_URL // 使用环境变量

  const UpdateUser = async (updateUserID, userInfo) => {
    isLoading.value = true
    error.value = null
    // let loadingInstance = null
    // console.log(userInfo)

    try {
      // loadingInstance = ElLoading.service({ lock: true, background: 'rgba(0, 0, 0, 0.7)', text: t('message.requesting') }); // 启动加载动画
      const response = await axios
        .put(API_URL + '/api/users/' + updateUserID, {
          // body
          username: userInfo['username'],
          email: userInfo['email'],
          permission_level: userInfo['permission_level'],
        })
        .then((response) => {
          if (response.status === 200) {
            // 在这里处理成功逻辑
            console.log('用户修改成功:')
            ElNotification({
              title: t('message.update_success'),
              message: userInfo['username'] + ' ' + t('message.update_success'),
              type: 'success',
            })
          }
        })
    } catch (err) {
      console.error('请求失败:', err.response || err)
      error.value = err.response || err
      // 在这里处理失败逻辑
      ElMessage.error(t('message.message_failed'))
      if (err.response.data.error_message) {
        err.response.data.error_message.forEach((errMsg) => {
          ElMessage.error(t('message.' + errMsg))
        })
      }
    } finally {
      isLoading.value = false
      // if (loadingInstance) {
      //     loadingInstance.close() // 关闭加载动画
      // }
    }
  }

  return { UpdateUser, isLoading, error }
}
