<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-image class="logo" :src="logo" fit="fill" />
            </el-header>
            <el-container>
                <el-aside class="side" width="200px">
                    <SideBar />
                </el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>
  

<script setup>
import logo from '../assets/logo/YLine_Logo_noBG.png'
import SideBar from '../components/SideBar.vue'

</script>

<style scoped>
.logo {
    height: 100%;
    margin-left: 3%;
}

</style>