<template>
  <div class="bridge-docs-view p-6 max-w-5xl mx-auto space-y-6">
    <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm">
      <h2 class="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
        <component
          :is="BookOpenIcon"
          class="w-4 h-4 text-zinc-600 dark:text-zinc-400"
        />
        <span>IframeBridge 跨域通信 SDK 开发者指南</span>
      </h2>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
        为子应用提供标准化、跨框架、零侵入的通信能力，解决 iframe 与宿主后台交互痛点。
      </p>
    </div>

    <!-- 接入流程 -->
    <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm space-y-4">
      <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        一、子应用接入方式
      </h3>

      <div class="space-y-3 text-xs">
        <div>
          <span class="font-medium text-zinc-800 dark:text-zinc-200">方式 A：原生 HTML / 静态页面引入</span>
          <pre class="bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg mt-1.5 font-mono text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800">&lt;!-- 直接在子页面 head 或 body 中引入 SDK 脚本 --&gt;
&lt;script src="/bridge-client.js"&gt;&lt;/script&gt;
&lt;script&gt;
  // 全局变量 window.bridgeClient 即可直接使用
  bridgeClient.showMessage('子系统已就绪', 'success');
&lt;/script&gt;</pre>
        </div>

        <div>
          <span class="font-medium text-zinc-800 dark:text-zinc-200">方式 B：现代工程化项目（Vue / React / Angular）引入</span>
          <pre class="bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg mt-1.5 font-mono text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800">import { bridgeClient } from '@/core/bridge-client'

// 触发全局通知
bridgeClient.showMessage('保存成功', 'success')</pre>
        </div>
      </div>
    </div>

    <!-- 核心 API 矩阵 -->
    <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm space-y-4">
      <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        二、核心 API 规范
      </h3>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-mono">
              <th class="py-2 px-3">
                方法名
              </th>
              <th class="py-2 px-3">
                参数说明
              </th>
              <th class="py-2 px-3">
                功能说明
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200">
            <tr>
              <td class="py-2.5 px-3 font-mono font-medium">
                showMessage(msg, type, duration)
              </td>
              <td class="py-2.5 px-3 font-mono text-zinc-500">
                type: 'success' | 'warning' | 'info' | 'error'
              </td>
              <td class="py-2.5 px-3">
                调用宿主后台全局消息条，避免被 iframe 边界裁剪
              </td>
            </tr>
            <tr>
              <td class="py-2.5 px-3 font-mono font-medium">
                showNotification(title, msg, type)
              </td>
              <td class="py-2.5 px-3 font-mono text-zinc-500">
                title: string, msg: string
              </td>
              <td class="py-2.5 px-3">
                调用宿主全局通知弹窗
              </td>
            </tr>
            <tr>
              <td class="py-2.5 px-3 font-mono font-medium">
                setTabTitle(title, path?)
              </td>
              <td class="py-2.5 px-3 font-mono text-zinc-500">
                title: string
              </td>
              <td class="py-2.5 px-3">
                动态修改父级当前活跃 Tab 的显示标题
              </td>
            </tr>
            <tr>
              <td class="py-2.5 px-3 font-mono font-medium">
                navigate(path)
              </td>
              <td class="py-2.5 px-3 font-mono text-zinc-500">
                path: string
              </td>
              <td class="py-2.5 px-3">
                命令宿主后台跳转到指定路由（内置或 iframe 页面）
              </td>
            </tr>
            <tr>
              <td class="py-2.5 px-3 font-mono font-medium">
                closeCurrentTab()
              </td>
              <td class="py-2.5 px-3 font-mono text-zinc-500">
                -
              </td>
              <td class="py-2.5 px-3">
                子页面完成操作后主动关闭自身所在的 Tab 标签页
              </td>
            </tr>
            <tr>
              <td class="py-2.5 px-3 font-mono font-medium">
                onThemeChange(callback)
              </td>
              <td class="py-2.5 px-3 font-mono text-zinc-500">
                callback: ({ isDark: boolean }) =&gt; void
              </td>
              <td class="py-2.5 px-3">
                监听宿主明暗模式切换，子应用实时联动响应
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 安全指引 -->
    <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm space-y-3">
      <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
        <component
          :is="ShieldIcon"
          class="w-4 h-4 text-zinc-600 dark:text-zinc-400"
        />
        <span>三、安全防范与跨域最佳实践</span>
      </h3>
      <div class="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <p>1. <strong>Origin 校验</strong>：在生产环境中，应在宿主端初始化 Bridge 时配置明确的允许域名白名单列表，防止恶意页面伪装 postMessage 发送破坏性指令。</p>
        <p>2. <strong>防范点击劫持</strong>：对外开放 iframe 嵌入的子服务，应在 Nginx 配置安全的 <code>Content-Security-Policy: frame-ancestors 'self' https://admin.yourdomain.com</code>，仅对后台授权。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookOpen, Shield } from 'lucide-vue-next'

const BookOpenIcon = BookOpen
const ShieldIcon = Shield
</script>
