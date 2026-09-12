import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout/index.vue'

NProgress.configure({ showSpinner: false })

// 路由元信息类型扩展
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    isIframe?: boolean
    iframeUrl?: string
    keepAlive?: boolean
    hidden?: boolean
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '工作台',
          icon: 'LayoutDashboard',
          isIframe: false,
          keepAlive: true
        }
      },
      {
        path: 'iframe/demo-interactive',
        name: 'IframeInteractive',
        component: () => import('@/views/empty/index.vue'),
        meta: {
          title: '通信演练子系统',
          icon: 'Radio',
          isIframe: true,
          iframeUrl: '/demo-subapp.html'
        }
      },
      {
        path: 'iframe/demo-form',
        name: 'IframeForm',
        component: () => import('@/views/empty/index.vue'),
        meta: {
          title: '长表单状态保活',
          icon: 'FileText',
          isIframe: true,
          iframeUrl: '/demo-form.html'
        }
      },
      {
        path: 'iframe/vue-docs',
        name: 'IframeVueDocs',
        component: () => import('@/views/empty/index.vue'),
        meta: {
          title: 'Vue3 官方文档',
          icon: 'Globe',
          isIframe: true,
          iframeUrl: 'https://cn.vuejs.org/'
        }
      },
      {
        path: 'configurator',
        name: 'IframeConfigurator',
        component: () => import('@/views/configurator/index.vue'),
        meta: {
          title: 'iframe 配置中心',
          icon: 'Settings2',
          isIframe: false,
          keepAlive: true
        }
      },
      {
        path: 'docs/bridge',
        name: 'BridgeDocs',
        component: () => import('@/views/docs/bridge.vue'),
        meta: {
          title: 'Bridge 通信文档',
          icon: 'BookOpen',
          isIframe: false,
          keepAlive: true
        }
      },
      {
        path: 'system/users',
        name: 'SystemUsers',
        component: () => import('@/views/system/users.vue'),
        meta: {
          title: '集成系统用户',
          icon: 'Users',
          isIframe: false,
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((_to, _from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
