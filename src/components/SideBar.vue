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
    <el-menu-item index="1" @click="computeClusterClick">
      <el-icon>
        <Histogram />
      </el-icon>
      <template #title>
        {{ $t('message.compute_cluster') }}
      </template>
    </el-menu-item>
    <el-menu-item index="2" @click="taskManageClick">
      <el-icon>
        <Grid />
      </el-icon>
      <template #title>
        {{ $t('message.taskManage') }}
      </template>
    </el-menu-item>
    <el-menu-item v-if="show_userMange" index="3" @click="userManageClick">
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
import { Menu, UserFilled, Histogram, Grid } from '@element-plus/icons-vue'

import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'

import Projects from './Projects.vue'
import UserManage from './UserManage.vue'
import ComputeCluster from './ComputeCluster.vue'
import TaskManage from './TaskManage.vue'

import { ref, markRaw } from 'vue'
import { useTabStore } from '../stores/tab'
const tabStore = useTabStore()
const { t } = useI18n()
const props = defineProps({
  theCollapse: Boolean,
})

const show_userMange = ref(false)

const authStore = useAuthStore()
if (authStore.user) {
  if (authStore.user['permissionLevel'] >= 5) {
    show_userMange.value = true
  }
}

function projectsClick() {
  tabStore.addTab({
    title: t('message.project'),
    name: 'projects',
    content: markRaw(Projects),
  })
  tabStore.setActivateTab('projects')
}

function computeClusterClick() {
  tabStore.addTab({
    title: t('message.compute_cluster'),
    name: 'compute_cluster',
    content: markRaw(ComputeCluster),
  })
  tabStore.setActivateTab('compute_cluster')
}

function taskManageClick() {
  tabStore.addTab({
    title: t('message.taskManage'),
    name: 'taskManage',
    content: markRaw(TaskManage),
  })
  tabStore.setActivateTab('taskManage')
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
