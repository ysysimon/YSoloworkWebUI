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
                <el-input v-for="column in columns" :key="column.key" :placeholder=column.title
                    v-model="inputRefs[column.key]" :disabled="inputDisableRefs[column.key]"
                    :type="inputTyperRefs[column.key]" />
            </el-space>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-popconfirm @confirm="submitUpdate" icon="" confirm-button-type="danger" :title="popconfirmText">
                    <template #reference>
                        <el-button>{{ $t('message.confirm_update') }}</el-button>
                    </template>
                </el-popconfirm>
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

import { useGetAllUsers } from '../APIs/useGetAllUsers';
const { GetAllUsers, isLoading, error } = useGetAllUsers();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import dayjs from 'dayjs'

const drawer2 = ref(false)
const inputRefs = ref({})
const inputDisableRefs = ref({})
const inputTyperRefs = ref({})
const popconfirmText = ref(t('message.r_u_sure'))

const columns = ref([])
const data = ref([])

// 在 mount的时候请求用户数据
function GetUsers () {
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
}
onMounted(GetUsers)

// 弹出修改内容的二级抽屉
const cellProps = ({ rowIndex, rowData }) => {
    const key = rowIndex
    return {
        // ['data-key']: key,
        onMouseup: () => {
            //   console.log(rowIndex, "Clicked!")
            drawer2.value = true
            Object.keys(rowData).forEach((key) => {
                inputRefs.value[key] = rowData[key]
                // console.log(key)
                if (key === 'id' || key === 'updated_at') {
                    inputDisableRefs.value[key] = true
                }

                if (key === 'permission_level') {
                    inputTyperRefs.value[key] = 'number'
                }
            })
        },
    }
}

// 提交修改
import { useUpdateUser } from '../APIs/useUpdateUser';
const { UpdateUser, isUpdateLoading, Updateerror } = useUpdateUser();

function submitUpdate() {
    //console.log("submited!")
    // console.log(inputRefs)
    UpdateUser( inputRefs.value["id"],{
        "username": inputRefs.value["username"],
        "email": inputRefs.value["email"],
        "permission_level": inputRefs.value["permission_level"]
    }).then(
        () => {
            GetUsers()
        },
        (error) => {
            console.log('Promise Failed!', error); // 如果失败，会打印 "失败原因"
        }
    ),
    drawer2.value = false
}
</script>

<style scoped>
.tabWrap {
    width: 100%;
    height: 90vh;
}
</style>
