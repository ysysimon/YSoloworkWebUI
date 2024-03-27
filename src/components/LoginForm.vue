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
                <el-button class="button" @click="login">
                    {{ $t('message.login') }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-config-provider>
</template>

<script setup>
import { ref } from 'vue';

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


function login() {
    formRef.value.validate(async (valid) => {
        if (valid) {
            console.log('表单验证成功:', form);
            // 提交登入表单
            const response = await fetch('http://localhost:3000/users?username=' + username.value + '&password=' + password.value);
            const users = await response.json();

            if (users.length > 0) {
                alert('Login successful');
                // 这里处理登录成功逻辑，如保存用户状态或重定向
            } else {
                alert('Login failed');
                // 处理登录失败逻辑
            }
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