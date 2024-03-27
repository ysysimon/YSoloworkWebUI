<template>
    <el-menu class="menu" :collapse="theCollapse">
        <el-menu-item index="1">
            <el-icon>
                <Menu />
            </el-icon>
            <template #title>
                {{ $t('message.project') }}
            </template>
        </el-menu-item>

    </el-menu>
</template>

<script setup>
import {
    Menu,

} from '@element-plus/icons-vue'

const props = defineProps({
    theCollapse: Boolean,
});

</script>

<style scoped>
.menu {
    height: 100%;
}

</style>