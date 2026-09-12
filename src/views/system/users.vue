<template>
  <div class="system-users-view p-6 max-w-7xl mx-auto space-y-6">
    <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div>
        <h2 class="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <component
            :is="UsersIcon"
            class="w-4 h-4 text-zinc-600 dark:text-zinc-400"
          />
          <span>集成系统用户与权限</span>
        </h2>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          管理接入此多系统集成网关的跨应用授权账号与令牌角色。
        </p>
      </div>

      <div class="flex items-center gap-2">
        <el-button
          size="small"
          @click="handleExport"
        >
          导出名单
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleAddUser"
        >
          新增账号
        </el-button>
      </div>
    </div>

    <!-- 数据表格卡片 -->
    <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm space-y-4">
      <div class="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div class="w-full sm:w-72">
          <el-input
            v-model="searchKey"
            placeholder="搜索用户名、姓名或角色..."
            size="small"
            clearable
          >
            <template #prefix>
              <component
                :is="SearchIcon"
                class="w-3.5 h-3.5 text-zinc-400"
              />
            </template>
          </el-input>
        </div>

        <span class="text-xs text-zinc-400 font-mono">
          共 {{ filteredUsers.length }} 条记录
        </span>
      </div>

      <el-table
        :data="filteredUsers"
        style="width: 100%"
        class="zinc-table"
      >
        <el-table-column
          prop="id"
          label="UID"
          width="100"
        />
        <el-table-column label="用户">
          <template #default="{ row }">
            <div class="flex items-center gap-2.5">
              <img
                :src="row.avatar"
                class="w-6 h-6 rounded-full object-cover"
              >
              <div>
                <div class="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {{ row.name }}
                </div>
                <div class="text-[11px] text-zinc-400 font-mono">
                  {{ row.username }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="role"
          label="跨系统角色"
          width="140"
        >
          <template #default="{ row }">
            <span class="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              {{ row.role }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template #default="{ row }">
            <span
              class="inline-flex items-center gap-1.5 text-xs"
              :class="row.status === '正常' ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-400'"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="row.status === '正常' ? 'bg-emerald-500' : 'bg-zinc-400'"
              />
              {{ row.status }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastLogin"
          label="最后同步登录"
          width="180"
        />
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
        >
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click="handleDelete(row)"
            >
              停用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Users, Search } from 'lucide-vue-next'

const UsersIcon = Users
const SearchIcon = Search

const searchKey = ref('')

interface UserItem {
  id: string
  name: string
  username: string
  role: string
  status: string
  lastLogin: string
  avatar: string
}

const userList = ref<UserItem[]>([
  {
    id: 'U1001',
    name: '系统管理员',
    username: 'admin@system.local',
    role: '超级管理员',
    status: '正常',
    lastLogin: '2026-09-12 13:45:02',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'
  },
  {
    id: 'U1002',
    name: '安全审计员',
    username: 'auditor@sec.local',
    role: '审计专员',
    status: '正常',
    lastLogin: '2026-09-11 18:22:15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80'
  },
  {
    id: 'U1003',
    name: '财务集成系统对接人',
    username: 'finance_ops@corp.local',
    role: '财务专员',
    status: '正常',
    lastLogin: '2026-09-10 09:12:44',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80'
  },
  {
    id: 'U1004',
    name: '供应链只读账号',
    username: 'supply_reader@corp.local',
    role: '观察员',
    status: '停用',
    lastLogin: '2026-08-30 11:00:18',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80'
  }
])

const filteredUsers = computed(() => {
  if (!searchKey.value.trim()) return userList.value
  const q = searchKey.value.toLowerCase()
  return userList.value.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.username.toLowerCase().includes(q) ||
    u.role.toLowerCase().includes(q)
  )
})

const handleExport = () => {
  ElMessage.info('已请求导出用户凭证报表')
}

const handleAddUser = () => {
  ElMessage.info('新增账号抽屉已唤起')
}

const handleEdit = (row: UserItem) => {
  ElMessage.info(`编辑用户: ${row.name}`)
}

const handleDelete = (row: UserItem) => {
  ElMessage.warning(`已修改用户 ${row.name} 状态为停用`)
  row.status = '停用'
}
</script>
