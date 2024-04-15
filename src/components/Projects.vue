<template>
    <el-space wrap>
        <ProjectCard v-for="i in 33" :key="i" style="width: 360px"/>
  </el-space>
</template>

<script setup>
import ProjectCard from './Projects/ProjectCard.vue';


</script>

<style scoped>

</style>