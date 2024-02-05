<template>
  <div class="login-div">
    <el-image class="logo" :src="logo" fit="fill" />
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue';
import logo from '../assets/logo/YLine_Logo_noBG.png'

</script>

<style scoped>
.login-div {
  position: fixed;
  left: 50%;
  /* 水平居中 */
  bottom: 50%;
  /* 垂直居中 */
  top: 30%;
  transform: translate(-50%, -50%);
  /* 确保准确居中 (考虑组件自身的X轴宽度)*/
}

.logo {
  width: 200px;
  height: 200px;
}
</style>