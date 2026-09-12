<template>
  <div class="configurator-view p-6 max-w-5xl mx-auto space-y-6">
    <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm">
      <h2 class="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
        <component
          :is="Settings2Icon"
          class="w-4 h-4 text-zinc-600 dark:text-zinc-400"
        />
        <span>iframe 页面动态配置与联调台</span>
      </h2>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
        在线配置新的子应用接入参数，并进行实时挂载测试与代码生成。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 左侧：参数表单 -->
      <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm space-y-4">
        <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          接入参数配置
        </h3>

        <el-form
          label-position="top"
          class="space-y-3"
        >
          <el-form-item label="应用标题 (Title)">
            <el-input
              v-model="form.title"
              placeholder="如：财务发票对账平台"
            />
          </el-form-item>

          <el-form-item label="路由访问路径 (Route Path)">
            <el-input
              v-model="form.path"
              placeholder="如：/iframe/invoice-audit"
            />
          </el-form-item>

          <el-form-item label="嵌入应用目标 URL (Iframe URL)">
            <el-input
              v-model="form.iframeUrl"
              placeholder="如：https://example.com/app 或 /internal/page.html"
            />
          </el-form-item>

          <el-form-item label="预设快捷测试模板">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tpl in quickTemplates"
                :key="tpl.title"
                type="button"
                class="text-xs px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300"
                @click="applyTemplate(tpl)"
              >
                {{ tpl.title }}
              </button>
            </div>
          </el-form-item>

          <div class="pt-2 flex gap-3">
            <button
              type="button"
              class="px-4 py-2 text-xs font-medium rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
              @click="handleTestMount"
            >
              即时挂载测试
            </button>
            <button
              type="button"
              class="px-4 py-2 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
              @click="handleReset"
            >
              重置参数
            </button>
          </div>
        </el-form>
      </div>

      <!-- 右侧：路由代码生成与安全指引 -->
      <div class="space-y-6">
        <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              生成的路由配置代码
            </h3>
            <button
              class="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-mono"
              @click="copyCode"
            >
              复制
            </button>
          </div>

          <pre class="bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg text-xs font-mono text-zinc-800 dark:text-zinc-200 overflow-x-auto border border-zinc-200 dark:border-zinc-800">{{ generatedCode }}</pre>
        </div>

        <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm space-y-3">
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <component
              :is="InfoIcon"
              class="w-4 h-4 text-zinc-500"
            />
            <span>X-Frame-Options 避坑提示</span>
          </h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            若目标页面在 iframe 中呈现空白或提示拒绝连接，通常是由于目标服务器设置了 HTTP 响应头：
            <code class="px-1 bg-zinc-100 dark:bg-zinc-800 rounded font-mono">X-Frame-Options: SAMEORIGIN / DENY</code>。
          </p>
          <div class="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
            <div>方案一：由目标系统服务配置允许嵌入的域名白名单。</div>
            <div>方案二：在后台网关或 Nginx 反向代理层移除或重写该头。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTabsStore } from '@/store/modules/tabs'
import { ElMessage } from 'element-plus'
import { Settings2, Info } from 'lucide-vue-next'

const Settings2Icon = Settings2
const InfoIcon = Info

const router = useRouter()
const tabsStore = useTabsStore()

const form = reactive({
  title: '企业流程审批平台',
  path: '/iframe/workflow-audit',
  iframeUrl: '/demo-form.html',
  icon: 'FileText'
})

const quickTemplates = [
  { title: '本地通信演示', path: '/iframe/demo-interactive', iframeUrl: '/demo-subapp.html', icon: 'Radio' },
  { title: '企业立项长表单', path: '/iframe/demo-form', iframeUrl: '/demo-form.html', icon: 'FileText' },
  { title: 'Vue3 官方手册', path: '/iframe/vue-docs', iframeUrl: 'https://cn.vuejs.org/', icon: 'Globe' }
]

const applyTemplate = (tpl: typeof quickTemplates[0]) => {
  form.title = tpl.title
  form.path = tpl.path
  form.iframeUrl = tpl.iframeUrl
  form.icon = tpl.icon
}

const handleReset = () => {
  form.title = ''
  form.path = ''
  form.iframeUrl = ''
  form.icon = 'AppWindow'
}

const generatedCode = computed(() => {
  return `{
  path: '${form.path.replace(/^\//, '')}',
  name: '${form.path.replace(/[^a-zA-Z0-9]/g, '') || 'IframeApp'}',
  component: () => import('@/views/empty/index.vue'),
  meta: {
    title: '${form.title || '自定义子系统'}',
    icon: '${form.icon}',
    isIframe: true,
    iframeUrl: '${form.iframeUrl}'
  }
}`
})

const copyCode = () => {
  navigator.clipboard.writeText(generatedCode.value).then(() => {
    ElMessage.success('路由配置已复制到剪贴板')
  })
}

const handleTestMount = () => {
  if (!form.title || !form.path || !form.iframeUrl) {
    ElMessage.warning('请补齐标题、路径与目标 URL')
    return
  }

  tabsStore.addTab({
    title: form.title,
    path: form.path,
    iframeUrl: form.iframeUrl,
    isIframe: true,
    closable: true,
    icon: form.icon
  })

  router.push(form.path).catch(() => {})
  ElMessage.success(`已挂载并激活 ${form.title} 容器`)
}
</script>
