<template>
    <el-menu class="menu" :collapse="theCollapse">
        <el-menu-item index="0" @click="projectsClick">
            <el-icon>
                <Menu />
            </el-icon>
            <template #title>
                {{ $t('message.project') }}
            </template>
        </el-menu-item>
        <el-menu-item index="1" @click="taskManageClick">
            <el-icon>
                <Histogram />
            </el-icon>
            <template #title>
                {{ $t('message.compute_cluster') }}
            </template>
        </el-menu-item>
        <el-menu-item index="2" @click="userManageClick">
            <el-icon>
                <UserFilled />
            </el-icon>
            <template #title>
                {{ $t('message.userManage') }}
            </template>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import {
    Menu,
    UserFilled,
    Histogram,
} from '@element-plus/icons-vue'

import { useI18n } from 'vue-i18n';

import Projects from './Projects.vue';
import UserManage from './UserManage.vue';
import TaskManage from './TaskManage.vue';

import { markRaw } from 'vue'
import { useTabStore } from '../stores/tab';
const tabStore = useTabStore();
const { t } = useI18n();
const props = defineProps({
    theCollapse: Boolean,
});

function projectsClick() {
    tabStore.addTab({
        title: t('message.project'),
        name: 'projects',
        content: markRaw(Projects),
    })
    tabStore.setActivateTab('projects')
}

function taskManageClick() {
    tabStore.addTab({
        title: t('message.compute_cluster'),
        name: 'compute_cluster',
        content: markRaw(TaskManage),
    })
    tabStore.setActivateTab('compute_cluster')
}


function userManageClick() {
    tabStore.addTab({
        title: t('message.userManage'),
        name: 'userManage',
        content: markRaw(UserManage),
    })
    tabStore.setActivateTab('userManage')
}

</script>

<style scoped>
.menu {
    height: 100%;
}
</style>