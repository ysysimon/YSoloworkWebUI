<template>
    <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="4">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="4">
            <ProjectCard />
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="4">
            <ProjectCard />
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="4">
            <ProjectCard />
            <ProjectCard />
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="4">
            <ProjectCard />
            <ProjectCard />
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="4">
            <ProjectCard />
            <ProjectCard />
        </el-col>
    </el-row>
</template>

<script setup>
import ProjectCard from './Projects/ProjectCard.vue';


</script>

<style scoped>

</style>