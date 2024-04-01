import axios from 'axios';
import { ref } from 'vue';

import { ElLoading } from 'element-plus';
import 'element-plus/theme-chalk/el-loading.css';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css';


import { useI18n } from 'vue-i18n';

import { useRouter } from 'vue-router';

import { useAuthStore } from '../stores/auth';

export function useLogin() {
    const isLoading = ref(false);
    const error = ref(null);
    const { t } = useI18n();
    const loginUrl = import.meta.env.VITE_API_URL; // 使用环境变量

    const router = useRouter();
    const store = useAuthStore();

    const login = async (username, password) => {
        isLoading.value = true;
        error.value = null;
        let loadingInstance = null

        try {
            loadingInstance = ElLoading.service({ lock: true, background: 'rgba(0, 0, 0, 0.7)', text: t('message.loging') }); // 启动加载动画
            const response = await axios.post(loginUrl + '/api/auth/login', {
                username,
                password
            })
                .then(response => {
                    if (response.status === 200 && response.data.token) {
                        const token = response.data.token;
                        // 在这里处理登录成功逻辑，例如状态更新、路由跳转等
                        store.setToken(response.data.token);
                        //路由跳转
                        router.push('/home');
                    }
                })
            console.log('登录成功:', response.data);
        } catch (err) {
            console.error('登录失败:', err.response || err);
            error.value = err.response || err;
            // 在这里处理登录失败逻辑
            ElMessage.error(t('message.loging_failed'))
        } finally {
            isLoading.value = false;
            if (loadingInstance) {
                loadingInstance.close() // 关闭加载动画
            }
        }
    };

    return { login, isLoading, error };
}
