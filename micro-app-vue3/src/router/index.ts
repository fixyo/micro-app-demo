import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const constantFiles = import.meta.globEager('../router/constantRoutes/*')
let constantModules: Array<RouteRecordRaw> = []
Object.keys(constantFiles).forEach((path) => {
  constantModules = constantModules.concat(constantFiles[path].default)
})

const dynamicFiles = import.meta.globEager('../router/authRoutes/*')
let dynamicModules: Array<RouteRecordRaw> = []
Object.keys(dynamicFiles).forEach((path) => {
  dynamicModules = dynamicModules.concat(dynamicFiles[path].default)
})

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layout/Layout'),
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/Dashboard'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard名称比较长，要做省略处理还是不要呢',
          icon: '#icondashboard'
        }
      }
    ]
  },
  ...constantModules
]

export const dynamicRoutes: RouteRecordRaw[] = [...dynamicModules]

// eslint-disable-next-line no-underscore-dangle
const isInQK = qiankunWindow.__POWERED_BY_QIANKUN__

const router = createRouter({
  history: createWebHashHistory(isInQK ? '/vue3' : ''),
  routes: constantRoutes
})

export const restRouter = () => {
  const newRouter = router
  ;(router as any).matcher = (newRouter as any).matcher
}

export default router
