import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfo } from '@/types'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>({
    username: 'admin',
    displayName: '系统管理员',
    role: '超级管理员',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    token: 'bearer_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.zinc_admin_token'
  })

  const updateUserInfo = (info: Partial<UserInfo>) => {
    userInfo.value = { ...userInfo.value, ...info }
  }

  return {
    userInfo,
    updateUserInfo
  }
})
