<template>
    <el-tabs v-model="activeTab" type="card" class="demo-tabs" closable @tab-remove="removeTab">
        <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.title" :name="item.name">
            <component :is="item.content"></component>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { useTabStore } from '../stores/tab';
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'

const tabStore = useTabStore();
const { activeTab, tabs } = storeToRefs(tabStore);

// 使用 watch 导致很多问题
// watch(activeTab, () => {
    
// })

// watch(tabs, () => {
    
// })

const removeTab = (targetName) => {
    const _tabs = tabs.value
    let activeName = activeTab.value
    if (activeName === targetName) {
        _tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                const nextTab = _tabs[index + 1] || _tabs[index - 1]
                if (nextTab) {
                    activeName = nextTab.name
                }
            }
        })
    }
    activeTab.value = activeName
    tabs.value = _tabs.filter((tab) => tab.name !== targetName)

    // 存储tab状态有bug
    // if (tabs.value && tabs.value.length == 0) {
    //     tabStore.activeTab = null;
    // }
    // tabStore.updateActiveTablocalStorage()
    // tabStore.updateTabslocalStorage()

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