<template>
    <el-scrollbar>
        <el-menu class="menu" :default-openeds="['1']" :collapse=false>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><Menu /></el-icon>
                    <h3>{{ $t('message.task') }}</h3>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">{{ $t('message.current_task') }}</el-menu-item>
                    <el-menu-item index="1-2">{{ $t('message.archive_task') }}</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<script setup>
import {
  Menu,

} from '@element-plus/icons-vue'
</script>

<style scoped>
.menu {
    height: 100%;
}
</style>