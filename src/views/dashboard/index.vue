<template>
  <div class="dashboard-view p-6 max-w-7xl mx-auto space-y-6">
    <!-- 顶部欢迎卡片 -->
    <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1">
          <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>ElementsPlus Admin 控制台</span>
            <span class="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              iframe-first v1.0
            </span>
          </h1>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
            专为多系统聚合、遗留老系统迁移与微前端多应用集成的后台管理模板。内置多 iframe 独立保活容器与安全的双向通信协议（IframeBridge），实现多标签无感切换与无刷新体验。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <router-link
            to="/iframe/demo-interactive"
            class="px-3.5 py-2 text-xs font-medium rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <component
              :is="RadioIcon"
              class="w-3.5 h-3.5"
            />
            <span>通信演练</span>
          </router-link>
          <router-link
            to="/configurator"
            class="px-3.5 py-2 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors flex items-center gap-1.5"
          >
            <component
              :is="Settings2Icon"
              class="w-3.5 h-3.5"
            />
            <span>配置中心</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 关键指标卡片 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm space-y-2">
        <div class="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
          <span class="text-xs font-medium">保活容器驻留数</span>
          <component
            :is="CpuIcon"
            class="w-4 h-4"
          />
        </div>
        <div class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
          {{ activeIframeCount }}
        </div>
        <div class="text-[11px] text-zinc-400">
          当前 DOM 树中保持活跃的子系统
        </div>
      </div>

      <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm space-y-2">
        <div class="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
          <span class="text-xs font-medium">已打开标签页</span>
          <component
            :is="LayersIcon"
            class="w-4 h-4"
          />
        </div>
        <div class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
          {{ tabsCount }}
        </div>
        <div class="text-[11px] text-zinc-400">
          混合视图标签管理
        </div>
      </div>

      <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm space-y-2">
        <div class="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
          <span class="text-xs font-medium">跨域安全过滤</span>
          <component
            :is="ShieldCheckIcon"
            class="w-4 h-4"
          />
        </div>
        <div class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
          Active
        </div>
        <div class="text-[11px] text-zinc-400">
          严格 Origin 校验与沙箱策略
        </div>
      </div>

      <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm space-y-2">
        <div class="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
          <span class="text-xs font-medium">响应基准延迟</span>
          <component
            :is="ActivityIcon"
            class="w-4 h-4"
          />
        </div>
        <div class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
          &lt; 1ms
        </div>
        <div class="text-[11px] text-zinc-400">
          基于 PostMessage 微任务通讯
        </div>
      </div>
    </div>

    <!-- iframe 实时驻留监控池 -->
    <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            iframe 内存保活实例池 (Active Instances)
          </h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            监控当前在后台维持 DOM 存活的独立页面容器，切换 Tab 不会触发卸载与重新请求
          </p>
        </div>
        <span class="text-xs font-mono px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400">
          驻留中: {{ iframeList.length }}
        </span>
      </div>

      <div
        v-if="iframeList.length === 0"
        class="text-center py-10 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-400 text-xs"
      >
        暂无打开的 iframe 容器，请点击左侧或下方体验菜单项
      </div>

      <div
        v-else
        class="divide-y divide-zinc-200 dark:divide-zinc-800"
      >
        <div
          v-for="item in iframeList"
          :key="item.id"
          class="py-3 flex items-center justify-between gap-4"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span
              class="w-2 h-2 rounded-full shrink-0"
              :class="[item.loaded ? 'bg-zinc-800 dark:bg-zinc-200' : 'bg-zinc-400 animate-pulse']"
            />
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                  {{ item.title }}
                </span>
                <span class="text-[10px] font-mono text-zinc-400">
                  ID: {{ item.id }}
                </span>
              </div>
              <div class="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                {{ item.url }}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <button
              class="px-2 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              @click="focusTab(item.id)"
            >
              激活查看
            </button>
            <button
              class="px-2 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              @click="refreshIframe(item.id)"
            >
              刷新
            </button>
            <button
              class="px-2 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-600 dark:text-red-400"
              @click="closeIframeTab(item.id)"
            >
              销毁释放
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能导航矩阵 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <router-link
        to="/iframe/demo-interactive"
        class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group space-y-2 shadow-sm"
      >
        <div class="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
          <component
            :is="RadioIcon"
            class="w-4 h-4"
          />
        </div>
        <h4 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          双向通信演练
        </h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          测试 iframe 内部通过 Bridge SDK 调用宿主通知、修改父级标签名与主题联动。
        </p>
      </router-link>

      <router-link
        to="/iframe/demo-form"
        class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group space-y-2 shadow-sm"
      >
        <div class="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
          <component
            :is="FileTextIcon"
            class="w-4 h-4"
          />
        </div>
        <h4 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          长表单保活测试
        </h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          体验复杂审批表单输入时，随意切换标签页，输入内容与滚动位置完全保留。
        </p>
      </router-link>

      <router-link
        to="/docs/bridge"
        class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group space-y-2 shadow-sm"
      >
        <div class="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
          <component
            :is="BookOpenIcon"
            class="w-4 h-4"
          />
        </div>
        <h4 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          集成与开发文档
        </h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          提供详细的子系统接入指引、代码范例以及常见跨域/X-Frame-Options 解决方案。
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTabsStore } from '@/store/modules/tabs'
import {
  Radio,
  Settings2,
  Cpu,
  Layers,
  ShieldCheck,
  Activity,
  FileText,
  BookOpen
} from 'lucide-vue-next'

const RadioIcon = Radio
const Settings2Icon = Settings2
const CpuIcon = Cpu
const LayersIcon = Layers
const ShieldCheckIcon = ShieldCheck
const ActivityIcon = Activity
const FileTextIcon = FileText
const BookOpenIcon = BookOpen

const router = useRouter()
const tabsStore = useTabsStore()

const iframeList = computed(() => tabsStore.iframeList)
const activeIframeCount = computed(() => tabsStore.iframeList.length)
const tabsCount = computed(() => tabsStore.tabs.length)

const focusTab = (id: string) => {
  tabsStore.activeTabPath = id
  router.push(id)
}

const refreshIframe = (id: string) => {
  const item = tabsStore.iframeList.find(i => i.id === id)
  if (item) {
    item.loading = true
    item.refreshKey = Date.now()
  }
}

const closeIframeTab = (id: string) => {
  tabsStore.closeTab(id)
}
</script>
