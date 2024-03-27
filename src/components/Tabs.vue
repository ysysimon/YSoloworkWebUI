<template>
    <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab">
        <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            <component :is="item.content"></component>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { onMounted, ref, markRaw  } from 'vue'
import Projects from '../components/Projects.vue';
import Sortable from 'sortablejs'
import ProjectCard from './Projects/ProjectCard.vue';

let tabIndex = 2
const editableTabsValue = ref('1')  //激活的tabs
const editableTabs = ref([
    {
        title: 'Tab 1',
        name: '1',
        content: markRaw(Projects),
    },
    {
        title: 'Tab 2',
        name: '2',
        content: "haha",
    },
])

const addTab = (targetName) => {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
    })
    editableTabsValue.value = newTabName
}
const removeTab = (targetName) => {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    activeName = nextTab.name
                }
            }
        })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}

//有问题 先不加
// // 在组件挂载后初始化Sortable 实现 Tabs的拖拽
// onMounted(async () => {
//     const el = document.querySelector('.el-tabs__nav') // 现在使用tabsRef来获取.el-tabs__nav
//     const _this = this
//     if (el) {
//         Sortable.create(el, {
//             onEnd({ newIndex, oldIndex }) {
//                 // 有时候位置会变为0，这时候默认改为1
//                 const newIndex2 = newIndex || 1
//                 const oldIndex2 = oldIndex || 1
//                 const currRow = JSON.parse(JSON.stringify(_this.layout[oldIndex2 - 1]))
//                 _this.layout.splice(oldIndex2 - 1, 1) // 删除旧的
//                 _this.layout.splice(newIndex2 - 1, 0, currRow) // 存入新的
//                 // 下面写自己的逻辑
//             },
//         })
//     }
// })

</script>

<style scoped>
/* Your styles go here */
</style>