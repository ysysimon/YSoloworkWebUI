import axios from 'axios';
import { ref } from 'vue';

// import { ElLoading } from 'element-plus';
import 'element-plus/theme-chalk/el-loading.css';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css';


import { useI18n } from 'vue-i18n';


export function useGetAllUsers() {
    const isLoading = ref(false);
    const error = ref(null);
    const { t } = useI18n();
    const loginUrl = import.meta.env.VITE_API_URL; // 使用环境变量

    const GetAllUsers = async () => {
        isLoading.value = true;
        error.value = null;
        // let loadingInstance = null
        let finalData = null;

        try {
            // loadingInstance = ElLoading.service({ lock: true, background: 'rgba(0, 0, 0, 0.7)', text: t('message.requesting') }); // 启动加载动画
            const response = await axios.get(loginUrl + '/api/users/', {
                // body

            })
                .then(response => {
                    if (response.status === 200) {
                        // 在这里处理成功逻辑
                        console.log('信息获取成功:');
                        finalData = response.data
                    }
                })
            
        } catch (err) {
            console.error('请求失败:', err.response || err);
            error.value = err.response || err;
            // 在这里处理失败逻辑
            ElMessage.error(t('message.message_failed'))
            if (err.response.data.error_message) {
                err.response.data.error_message.forEach(errMsg => {
                    ElMessage.error(t('message.' + errMsg))
                });
            }
        } finally {
            isLoading.value = false;
            // if (loadingInstance) {
            //     loadingInstance.close() // 关闭加载动画
            // }
        }

        return finalData
    };

    return { GetAllUsers, isLoading, error };
}
