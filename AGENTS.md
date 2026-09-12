# ElementsPlus Admin - iframe 优先后台管理模板

## 项目概述
ElementsPlus Admin 是一个专注于深度集成微前端与多应用嵌入场景的后台管理模板。基于 Vue 3、TypeScript、Element Plus、Vite 与 Tailwind CSS 构建，采用 Zinc 低饱和度色彩与类 Shadcn 的现代精致设计风格。

## 核心设计与关键决策

### 1. "iframe 优先" 架构设计
传统后台模板在将页面放入 `router-view` 时，切换路由会导致 iframe 重新挂载，引发严重的页面刷新、状态丢失与性能损耗。本模板采用解耦架构：
- **多 iframe 独立保活容器 (Keep-Alive Multi-Iframe)**：每个被激活的 iframe 路由在专用 DOM 容器中常驻，切换标签时仅通过 `v-show` / `display` 控制显隐，保证 iframe 内表单输入、滚动高度及运行状态不丢失。
- **混合路由支持**：支持普通内置 Vue 页面与 iframe 页面共存并无缝多标签管理。
- **全生命周期管理**：支持 iframe 标签的新建、关闭、关闭其他、关闭全部、强制刷新、在新窗口中弹出。
- **双向通信 Bridge (PostMessage SDK)**：
  - 提供宿主与子系统之间的标准化双向通信协议（`IframeBridge`）。
  - 支持能力：传递用户信息/Token、同步暗黑/Zinc 主题状态、由子系统发起父级路由跳转、设置父级标签标题、触发 Element Plus 宿主消息通知、全屏控制等。
  - 严谨的源校验（Origin Validation），防范恶意的跨域信息注入攻击。
- **体验与视觉优化**：
  - 子页面加载中采用平滑的骨架屏与 Zinc 质感 Loading 遮罩。
  - 支持单 iframe 独立全屏与主视口全屏模式。

### 2. 视觉与 UI 规范
- **低饱和度配色**：严格遵守 Zinc 系列冷灰/中性灰基调，无高饱和渐变色，严禁高饱和紫蓝渐变。
- **设计风格**：Shadcn Like 极简微阴影、精细边框（border-zinc-200 / dark:border-zinc-800）、圆角层次化。
- **图标系统**：采用 Lucide 风格的非线性单色线性矢量图标，保证清晰利落。
- **减少 Emoji**：文案与界面保持严肃庄重、大国风范。

### 3. 技术栈
- 基础核心：Vue 3.5+, TypeScript 5.7+, Vite 6+
- 状态管理：Pinia 2.3+
- 路由系统：Vue Router 4.5+
- UI 组件库：Element Plus 2.9+
- 样式方案：Tailwind CSS 3.4+, SASS
- 工具集：@vueuse/core, NProgress

## 目录结构约定
```text
src/
├── api/            # 接口与网络请求
├── assets/         # 静态资源与样式表
│   └── styles/     # 全局样式、Element Plus 主题覆写、Tailwind
├── components/     # 全局公共组件
│   ├── IframeView/ # iframe 核心容器与保活组件
│   └── ...
├── config/         # 系统配置与全局常量
├── core/           # iframe Bridge 桥接通信核心库
│   └── bridge.ts   # 跨域安全 postMessage 协议层
├── layout/         # 主体布局骨架 (Sidebar, Header, Tabs, AppMain)
├── router/         # 路由配置与动态菜单解析
├── store/          # Pinia 状态树 (tabs, user, settings, iframe)
├── views/          # 页面视图 (仪表盘、系统管理、iframe 调试演示等)
└── main.ts         # 入口文件
```

- [2026-09-12] 项目初始化：搭建 Vue3 + TS + Vite + Tailwind + Element Plus 架构，实现 iframe 优先保活与 PostMessage 通信桥梁。
- [2026-09-12] 功能深化：增加全局认证路由守卫与登录模块、Iframe 加载超时与容灾降级机制、子应用点击与宿主失焦事件同步（解决下拉菜单穿透滞留）、企业级全局防截屏水印（el-watermark）及上下文握手凭证下发。
