import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Layout'

const permissionRouter: Array<RouteRecordRaw> = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/directive',
    meta: {
      title: 'permission',
      icon: '#iconquanxian',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: '/permission/page',
        component: () => import('@/views/permission/Page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: '/permission/directive',
        component: () => import('@/views/permission/Directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: '/permission/role',
        component: () => import('@/views/permission/Role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['super-admin']
        }
      }
    ]
  }
]
export default permissionRouter
