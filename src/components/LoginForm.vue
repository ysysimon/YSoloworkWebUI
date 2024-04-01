<template>
    <el-config-provider :button="{ autoInsertSpace: true }">
        <el-form :model="form" label-width="auto" label-position="left" status-icon :rules="rules" ref="formRef">
            <el-form-item prop="username">
                <el-input v-model="form.username" :placeholder="$t('message.plz_input_usr')" />
            </el-form-item>
            <el-form-item prop="pwd">
                <el-input v-model="form.pwd" :placeholder="$t('message.plz_input_pwd')" show-password />
            </el-form-item>
            <el-form-item>
                <el-button class="button" @click="handleSubmit">
                    {{ $t('message.login') }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { ElLoading } from 'element-plus'

import { useLogin } from '../APIs/useLogin';
const { login, isLoading, error } = useLogin();


const form = ref({
    username: '',
    pwd: '',
})

const formRef = ref(null);

const validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入用户名'));
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
        callback(new Error('用户名只能包含字母和数字'));
    } else {
        callback();
    }
};


const rules = ref({
    username: [
        { validator: validateUsername, trigger: 'blur' }
    ],
    pwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
    ]
});


function handleSubmit () {
    formRef.value.validate(async (valid) => {
        if (valid) {
            //console.log('表单验证成功:', form);
            // 提交登入表单
            login(
                form.value.username,
                form.value.pwd
            )

        } else {
            console.error('表单验证失败');
            return false;
        }
    });
}


</script>

<style scoped>
.button {
    width: 100%;
}
</style>