<template>
    <div class="common-layout">
        <el-container>
            <!-- <el-header>
                <el-image class="logo" :src="logo" fit="fill" />
            </el-header> -->
            <el-container style="height: 100vh;">
                <el-aside class="side" @click="theCollapse = false" width="120">
                    <SideBar :theCollapse="theCollapse" />
                </el-aside>
                <el-main @click="theCollapse = true">
                    <!-- <Projects /> -->
                    <Tabs />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  

<script setup>
import logo from '../assets/logo/YLine_Logo_noBG.png'
import Projects from '../components/Projects.vue';
import SideBar from '../components/SideBar.vue'

import { ref } from 'vue';
import Tabs from '../components/Tabs.vue';
const theCollapse = ref(false);


</script>

<style scoped>
.logo {
    height: 100%;
    margin-left: 3%;
}


</style>