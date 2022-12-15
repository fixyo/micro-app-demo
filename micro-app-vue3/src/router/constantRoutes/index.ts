import { RouteRecordRaw } from 'vue-router'

const LoginRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    // component: () => import('@/views/sys/login/Login'),
    component: () => import('@/views/sys/login/ThreeLogin'),
    meta: {
      hideInMenu: true
    }
  }
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/views/sys/login/Login'),
  //   meta: {
  //     hideInMenu: true
  //   }
  // }
]
export default LoginRouter
