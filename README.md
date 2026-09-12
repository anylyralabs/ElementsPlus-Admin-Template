# ElementsPlus Admin - iframe 优先后台管理模板

> 基于 **Vue 3 + TypeScript + Element Plus + Vite + Tailwind CSS** 构建的微前端与多应用集成后台管理模板。
> 针对传统后台嵌入 iframe 时“Tab 切换重新加载、表单状态丢失、跨域通信困难”等痛点进行了系统化设计与深度优化。

---

## 核心亮点

### 1. 原生级 iframe 常驻保活（Keep-Alive Multi-Iframe）
- **独立 DOM 保活池**：普通 Vue 页面与 iframe 页面解耦，打开的 iframe 驻留在独立的全局容器池中，切换标签页仅使用 `v-show` 切换视口，**输入框内容、步骤条进度、滚动高度完全保持，零重复请求与重载**。
- **生命周期受控**：只有在用户明确关闭 Tab 标签时，对应 iframe 才从 DOM 树中安全销毁，兼顾体验与内存回收。
- **优雅加载体验**：每个 iframe 实例自带 Zinc 风格微光 Loading 遮罩与骨架动画，并提供超时检测与独立外链容灾打开方案。

### 2. 双向跨域通信 SDK（IframeBridge）
- **零依赖 Client SDK**：子系统既可通过原生脚本 `<script src="/bridge-client.js">` 接入，也可在工程化项目中 `import { bridgeClient } from '...'`。
- **丰富的交互能力**：
  - 子系统调用宿主 Element Plus 全局消息通知（`ElMessage` / `ElNotification`），避免被 iframe 边界裁剪；
  - 动态修改父级当前 Tab 标签标题；
  - 命令宿主跳转内部路由或打开新标签；
  - 子页面主动请求关闭当前 Tab；
  - 宿主主题联动：明暗模式（Dark Mode）与 Zinc 风格实时向所有 iframe 同步；
- **安全沙箱防范**：具备 Origin 来源合法性校验，抵御跨站请求伪装。

### 3. Shadcn-like 沉浸式 Zinc 极简设计
- 严格遵循低饱和度设计哲学，主色调采用 Zinc 冷灰与碳黑搭配，杜绝高饱和艳丽渐变与冗余 Emoji。
- 全站采用 Lucide 风格的非线性单色线性矢量图标，视觉清晰利落。
- 仿现代编辑器风格的多标签栏：支持横向滚轮滚动、右键上下文菜单（刷新单个应用、独立全屏、外部打开、批量关闭）。

---

## 项目结构

```text
├── public/                 # 静态资源与子系统通信 SDK
│   ├── bridge-client.js    # 纯原生 JS 通信客户端
│   ├── demo-subapp.html    # 通信演练演示子系统
│   └── demo-form.html      # 长表单保活测试演示子系统
├── src/
│   ├── assets/styles/      # Tailwind 与 Element Plus Zinc 主题覆写
│   ├── core/               # 通信核心层
│   │   ├── bridge-host.ts  # 宿主消息调度中心
│   │   └── bridge-client.ts# 客户端 SDK
│   ├── layout/             # 框架布局骨架
│   │   ├── components/
│   │   │   ├── IframeContainer/ # 关键：iframe 多实例保活容器
│   │   │   ├── Navbar/          # 顶部导航、面包屑、快捷搜索
│   │   │   ├── Sidebar/         # 极简折叠侧边栏
│   │   │   └── Tabs/            # 仿编辑器多标签栏与右键菜单
│   │   └── index.vue
│   ├── router/             # 路由表（内置页面与 iframe 页面混合管理）
│   ├── store/              # Pinia 状态树（tabs, app, user）
│   ├── views/              # 各功能页面
│   │   ├── dashboard/      # 控制台概览与 iframe 内存池监控
│   │   ├── configurator/   # iframe 在线配置中心与测试台
│   │   ├── docs/           # IframeBridge 开发者接入文档
│   │   └── system/         # 系统集成用户管理
│   ├── App.vue
│   └── main.ts
├── AGENTS.md               # 项目级上下文与架构决策文档
├── tailwind.config.cjs
└── vite.config.ts
```

---

## 快速上手

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖
```bash
pnpm install
```

### 启动本地开发服务
```bash
pnpm dev
```
启动后访问 `http://localhost:3000` 即可体验。

### 代码检查与构建
```bash
# 类型检查
pnpm run typecheck

# 语法检查与修复
pnpm run lint

# 生产环境打包
pnpm run build
```

---

## 如何添加一个 iframe 页面？

仅需在 `src/router/index.ts` 中配置一个路由条目：

```typescript
{
  path: 'iframe/your-app',
  name: 'YourApp',
  component: () => import('@/views/empty/index.vue'),
  meta: {
    title: '你的应用名称',
    icon: 'AppWindow',
    isIframe: true,
    iframeUrl: 'https://your-domain.com/path'
  }
}
```

后台会自动识别 `isIframe: true`，将其注册入多标签栏与保活池中，无需额外编码。

---

## 开源协议
MIT License
