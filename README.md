# ElementsPlus Admin

ElementsPlus Admin 是一个基于 Vue 3、TypeScript 与 Element Plus 的后台管理模板，专注于多系统集成与微前端嵌入场景，采用 iframe 优先（iframe-first）架构设计与 Zinc 低饱和度界面风格。

---

## 架构设计

### 1. 多 iframe 独立保活容器
在传统基于单页面路由架构的后台管理系统中，将 iframe 页面置于 `router-view` 内会导致路由切换时 DOM 节点销毁并触发重新加载，从而引发页面重载、用户输入表单丢失与网络开销等问题。

本系统采用解耦保活方案：
- **常驻 DOM 实例池**：所有被激活的 iframe 节点统一由独立容器托管，多标签切换时仅通过样式控制显隐（`v-show`），DOM 节点常驻内存，确保子应用内部表单输入、滚动高度及运行状态不丢失。
- **生命周期可控**：仅在标签页被主动关闭时，对应 iframe 实例方从 DOM 树中安全移除，回收内存。
- **加载状态管理**：各 iframe 实例配备加载遮罩与超时检测机制，避免外部站点因策略限制引发的永久挂起。

### 2. 双向跨域通信协议 (IframeBridge)
系统内置宿主与子系统之间的标准化通信层，提供 TypeScript SDK 与原生 JavaScript 脚本：
- **消息通信**：支持子系统调用宿主全局消息组件（`ElMessage`、`ElNotification`），避免提示框被 iframe 窗口裁剪。
- **页面与路由协同**：支持子系统发起修改父级标签页标题、请求路由跳转、打开新标签页及关闭自身标签页。
- **主题联动**：宿主切换明暗模式时，自动向所有活跃 iframe 广播主题状态变更事件。
- **上下文获取**：子系统可通过 `GET_CONTEXT` 主动请求宿主当前认证令牌与环境参数。
- **安全校验**：提供 Origin 域名白名单过滤机制，防范跨站非法消息注入。

---

## 项目结构

```text
├── public/                     # 静态资源与子系统示例
│   ├── bridge-client.js        # 客户端原生通信脚本
│   ├── demo-subapp.html        # 双向通信交互演示页
│   ├── demo-form.html          # 长表单保活测试页
│   └── vue-docs-preview.html   # 可嵌入特性速查页
├── src/
│   ├── assets/styles/          # 全局样式与 Zinc 变量定制
│   ├── core/                   # 通信核心层 (BridgeHost / BridgeClient)
│   ├── layout/                 # 布局框架 (Sidebar, Navbar, Tabs, IframeContainer)
│   ├── router/                 # 路由配置与全局认证守卫
│   ├── store/                  # Pinia 状态树
│   ├── views/                  # 内置功能视图
│   ├── App.vue
│   └── main.ts
├── AGENTS.md                   # 架构与开发约束文档
├── LICENSE                     # MIT 开源许可证
├── package.json
└── vite.config.ts
```

---

## 快速开始

### 依赖环境
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装与运行
```bash
# 安装依赖
pnpm install

# 启动本地开发服务
pnpm dev

# 代码质量与规范检查
pnpm run typecheck
pnpm run lint

# 生产环境构建
pnpm run build
```

---

## 子应用接入指南

### 1. 静态页面接入
在嵌入的子页面中引入 SDK 脚本：
```html
<script src="/bridge-client.js"></script>
<script>
  // 获取宿主上下文
  bridgeClient.getContext(function(context) {
    console.log('Token:', context.token);
  });

  // 调用宿主全局通知
  bridgeClient.showMessage('操作已完成', 'success');

  // 修改当前标签页标题
  bridgeClient.setTabTitle('新标题');
</script>
```

### 2. 工程化项目接入
```typescript
import { bridgeClient } from '@/core/bridge-client'

// 监听宿主主题切换
bridgeClient.onThemeChange(({ isDark }) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

// 命令宿主后台跳转路由
bridgeClient.navigate('/system/users')
```

---

## 开源许可证

本项目基于 [MIT 许可证](file:///data/data/com.termux/files/home/Project/ElementsPlus-Admin-Template/LICENSE) 开源。
