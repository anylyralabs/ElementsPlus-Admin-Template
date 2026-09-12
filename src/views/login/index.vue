<template>
  <div class="login-page min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 relative overflow-hidden">
    <!-- 极简低饱和背景微纹 -->
    <div class="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

    <!-- 登录卡片 -->
    <div class="w-full max-w-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-sm space-y-6 relative z-10">
      <!-- 头部 Brand -->
      <div class="space-y-2 text-center">
        <div class="w-10 h-10 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center mx-auto">
          <component
            :is="LayersIcon"
            class="w-5 h-5"
          />
        </div>
        <h2 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          ElementsPlus Admin
        </h2>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">
          iframe-first 微前端与多应用集成管理平台
        </p>
      </div>

      <!-- 表单区域 -->
      <el-form
        :model="loginForm"
        class="space-y-4"
        @submit.prevent="handleLogin"
      >
        <div class="space-y-1">
          <label class="text-xs font-medium text-zinc-700 dark:text-zinc-300">管理员账号</label>
          <el-input
            v-model="loginForm.username"
            placeholder="admin"
            size="large"
          >
            <template #prefix>
              <component
                :is="UserIcon"
                class="w-4 h-4 text-zinc-400"
              />
            </template>
          </el-input>
        </div>

        <div class="space-y-1">
          <label class="text-xs font-medium text-zinc-700 dark:text-zinc-300">凭证密码</label>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="••••••••"
            show-password
            size="large"
          >
            <template #prefix>
              <component
                :is="LockIcon"
                class="w-4 h-4 text-zinc-400"
              />
            </template>
          </el-input>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
        >
          <span v-if="!loading">登录并进入系统</span>
          <span
            v-else
            class="flex items-center gap-2"
          >
            <span class="w-3.5 h-3.5 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
            正在验证凭据...
          </span>
        </button>

        <!-- 演示一键填入快捷按钮 -->
        <div class="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-[11px] text-zinc-400">
          <span>体验账号: admin / 123456</span>
          <button
            type="button"
            class="text-zinc-700 dark:text-zinc-300 hover:underline"
            @click="fillDemoAccount"
          >
            一键填入
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Layers, User, Lock } from 'lucide-vue-next'

const LayersIcon = Layers
const UserIcon = User
const LockIcon = Lock

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: 'password'
})

const fillDemoAccount = () => {
  loginForm.username = 'admin'
  loginForm.password = '123456'
}

const handleLogin = () => {
  if (!loginForm.username.trim() || !loginForm.password.trim()) {
    ElMessage.warning('请输入完整的账号与密码')
    return
  }

  loading.value = true
  setTimeout(() => {
    loading.value = false
    const token = 'bearer_' + btoa(loginForm.username + '_' + Date.now())
    localStorage.setItem('access_token', token)
    ElMessage.success('认证成功，欢迎进入工作台')

    const redirect = (route.query.redirect as string) || '/dashboard'
    router.push(redirect)
  }, 600)
}
</script>
