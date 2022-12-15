import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Layout'

const threeRouter: RouteRecordRaw[] = [
  {
    path: '/three',
    component: Layout,
    redirect: 'noredirect',
    name: 'three',
    meta: {
      title: 'threejs',
      icon: '#iconchart1'
    },
    children: [
      {
        path: '/three/demo01',
        component: () => import('@/views/three/Demo01'),
        name: 'threeDemo01',
        meta: {
          title: 'HelloThreejs'
        }
      },
      {
        path: '/three/demo02',
        component: () => import('@/views/three/Demo02'),
        name: 'threeDemo02',
        meta: {
          title: '场景'
        }
      }
    ]
  }
]

export default threeRouter
