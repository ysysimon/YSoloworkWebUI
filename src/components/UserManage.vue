<template>
    <div class="tabWrap">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed>
                </el-table-v2>
            </template>
        </el-auto-resizer>
    </div>
    <el-drawer v-model="drawer2" >
        <template #header>
            <h4>set title by slot</h4>
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

<script setup>
import { ref } from 'vue';

const drawer2 = ref(false)

const generateColumns = (length = 10, prefix = 'column-', props) =>
    Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,

    }))

const generateData = (
    columns,
    length = 200,
    prefix = 'row-'
) =>
    Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
            (rowData, column, columnIndex) => {
                rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
                return rowData
            },
            {
                id: `${prefix}${rowIndex}`,
                parentId: null,
            }
        )
    })

const columns = generateColumns(10)
console.log(columns);
const data = generateData(columns, 200)
console.log(data);

// const columns = []
// const data = []

</script>

<style scoped>
.tabWrap {
    width: 100%;
    height: 90vh;
}
</style>
