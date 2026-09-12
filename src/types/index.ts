export interface TabItem {
  title: string
  path: string
  name?: string
  iframeUrl?: string
  isIframe?: boolean
  closable?: boolean
  icon?: string
  keepAlive?: boolean
}

export interface IframeInstanceState {
  id: string          // 路由路径或唯一标识
  title: string
  url: string
  loaded: boolean
  loading: boolean
  hasError: boolean
  errorMessage?: string
  refreshKey: number
}

export interface BridgeMessage<T = any> {
  type: string
  payload?: T
  source?: 'host' | 'sub-app'
  timestamp?: number
}

export interface UserInfo {
  username: string
  displayName: string
  role: string
  avatar: string
  token: string
}

export interface MenuItemConfig {
  title: string
  path: string
  name?: string
  icon?: string
  iframeUrl?: string
  isIframe?: boolean
  children?: MenuItemConfig[]
  external?: boolean
  badge?: string
}
