<template>
    <div class="common-layout">
        <el-container>
            <!-- <el-header>
                <el-image class="logo" :src="logo" fit="fill" />
            </el-header> -->
            <el-container style="height: 100vh;">
                <el-aside class="side" @click="theCollapse = false" width="120">
                    <SideBar :theCollapse="theCollapse" />
                    <el-dropdown class="user">
                        <el-icon size="20">
                            <User />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="logout">{{ $t('message.logout') }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
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
import {
    User,
} from '@element-plus/icons-vue'

import logo from '../assets/logo/YLine_Logo_noBG.png'
import Projects from '../components/Projects.vue';
import SideBar from '../components/SideBar.vue'

import { ref } from 'vue';
import Tabs from '../components/Tabs.vue';
const theCollapse = ref(false);

import { useLogout } from '../APIs/useLogout';
const { logout, isLoading, error } = useLogout();


</script>

<style scoped>
.logo {
    height: 100%;
    margin-left: 3%;
}

@media (max-width: 670px) {
    .user {
        position: fixed;
        left: 5%;
        bottom: 2%;
        z-index: 10;
    }
}

@media(min-width: 671px) and (max-width: 770px) {
    .user {
        position: fixed;
        left: 4%;
        bottom: 2%;
        z-index: 10;
    }
}

@media(min-width: 771px) and (max-width: 1100px) {
    .user {
        position: fixed;
        left: 3%;
        bottom: 2%;
        z-index: 10;
    }
}

@media(min-width: 1101px) and (max-width: 1500px) {
    .user {
        position: fixed;
        left: 2%;
        bottom: 2%;
        z-index: 10;
    }
}

@media(min-width: 1501px) {
    .user {
        position: fixed;
        left: 1%;
        bottom: 2%;
        z-index: 10;
    }
}


</style>