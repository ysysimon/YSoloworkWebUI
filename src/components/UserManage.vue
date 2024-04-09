<template>
    <div class="tabWrap">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <el-table-v2 :columns="columns" :cell-props="cellProps" :data="data" :width="width" :height="height" fixed>
                    <template #overlay v-if="isLoading">
                        <div class="el-loading-mask" style="display: flex; align-items: center; justify-content: center">
                            <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                                <loading-icon />
                            </el-icon>
                        </div>
                    </template>
                </el-table-v2>
            </template>
        </el-auto-resizer>
    </div>
    <el-drawer v-model="drawer2">
        <template #header>
            <h2>{{ $t('message.update_user') }}</h2>
        </template>
        <template #default>
            <el-space wrap size="large">
                <el-input v-for="column in columns" :key="column.key" :placeholder=column.title />
            </el-space>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="">confirm</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script lang="jsx" setup>
import {
    Loading as LoadingIcon,
    Timer,
} from '@element-plus/icons-vue'
import { ref, onMounted, h } from 'vue';

import { useGetAllUsers } from '../APIs/useGetAllUesers';
const { GetAllUsers, isLoading, error } = useGetAllUsers();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import dayjs from 'dayjs'

const drawer2 = ref(false)
const columns = ref([])
const data = ref([])

onMounted(() => {
    GetAllUsers().then(
        (value) => {
            // console.log(value) //for debug
            const dicKeys = Object.keys(value[0])
            columns.value = dicKeys.map(dictkey => {
                let columnDefinition = {
                    key: dictkey,
                    dataKey: dictkey,
                    title: t('message.' + dictkey),
                    width: 200
                }

                // 如果 dictkey 包含 'date'，则添加 cellRenderer 字段
                if (dictkey.includes('date')) {
                    columnDefinition.cellRenderer = (date) => (
                        <ElTooltip content={dayjs(date.cellData).format('YYYY-MM-DD HH:mm')}>
                            <div>
                                <span class="items-center">
                                    <ElIcon class="mr-3">
                                        <Timer />
                                    </ElIcon>
                                </span>
                                &nbsp;
                                <span class="items-center"> {dayjs(date.cellData).format('YYYY-MM-DD HH:mm')} </span>
                            </div>
                        </ElTooltip>
                    )
                }

                if (dictkey === "permission_level") {
                    columnDefinition.cellRenderer = (pLevel) => (
                        <ElTag type="success">{pLevel.cellData}</ElTag>
                    )
                    columnDefinition.align = 'center'
                }

                if (dictkey === "username") {
                    columnDefinition.cellRenderer = (username) => (
                        <ElTag>{username.cellData}</ElTag>
                    )
                }

                if (dictkey === "id") {
                    columnDefinition.cellRenderer = (ID) => (
                        <b>{ID.cellData}</b>
                    )
                }

                return columnDefinition
            })
            // console.log(columns) //for debug
            data.value = value
        },
        (error) => {
            console.log('Promise Failed!', error); // 如果失败，会打印 "失败原因"
        }
    )
})

const cellProps = ({ rowIndex, rowData }) => {
  const key = rowIndex
  return {
    // ['data-key']: key,
    onMouseup: () => {
    //   console.log(rowIndex, "Clicked!")
      drawer2.value = true
    },
  }
}


// table demo
// const generateColumns = (length = 10, prefix = 'column-', props) =>
//     Array.from({ length }).map((_, columnIndex) => ({
//         ...props,
//         key: `${prefix}${columnIndex}`,
//         dataKey: `${prefix}${columnIndex}`,
//         title: `Column ${columnIndex}`,
//         width: 150,

//     }))

// const generateData = (
//     columns,
//     length = 200,
//     prefix = 'row-'
// ) =>
//     Array.from({ length }).map((_, rowIndex) => {
//         return columns.reduce(
//             (rowData, column, columnIndex) => {
//                 rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
//                 return rowData
//             },
//             {
//                 id: `${prefix}${rowIndex}`,
//                 parentId: null,
//             }
//         )
//     })
// columns = generateColumns(10)
// console.log(columns);
// data = generateData(columns, 200)
// console.log(data);

</script>

<style scoped>
.tabWrap {
    width: 100%;
    height: 90vh;
}

</style>
