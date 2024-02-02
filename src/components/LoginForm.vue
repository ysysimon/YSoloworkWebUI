<template>
    <el-config-provider :button="{autoInsertSpace: true}">
        <el-form :model="form" label-width="auto" label-position="left">
            <el-form-item>
                <el-input v-model="form.username" :placeholder="$t('message.plz_input_usr')" />
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.pwd" :placeholder="$t('message.plz_input_pwd')" show-password />
            </el-form-item>
            <el-form-item>
                <el-button class="button">
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

</script>

<style scoped>
.button {
    width: 100%;
}
</style>