<template>
    <div class="tabWrap">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed>
                </el-table-v2>
            </template>
        </el-auto-resizer>
    </div>
</template>

<script setup>
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

// const columns = generateColumns(10)
// const data = generateData(columns, 200)

const columns = []
const data = []

</script>

<style scoped>
.tabWrap {
    width: 100%;
    height: 90vh;
}

</style>
