<template>
  <el-card class="card" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-row :gutter="20">
          <el-col :span="8">
            <span>项目名称</span>
          </el-col>
          <el-col :span="8">
            <el-progress
              style="position: flex"
              type="circle"
              :percentage="25"
              :width="50"
            />
          </el-col>
        </el-row>
      </div>
    </template>
    <el-timeline style="max-width: 600px">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
    <template #footer>参与用户头像</template>
  </el-card>
</template>

<script setup>
const props = defineProps({
  ProjectName: String,
  likes: Number,
  isPublished: Boolean,
})

const activities = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true,
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46',
  },
]
</script>

<style scoped>
.card {
  max-width: 480px;
  /* background-color: #0c1b23; */
  background: #141414;
}
</style>
