import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[]
    icon?: string
    title?: string
    cacheRoute?: boolean
  }
}
