import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Layout'

const chartsRouter: Array<RouteRecordRaw> = [
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'Charts',
    meta: {
      title: 'charts',
      icon: '#iconchart1'
    },
    children: [
      {
        path: '/charts/bar-chart',
        component: () => import('@/views/charts/Bar'),
        name: 'BarChartDemo',
        meta: {
          title: 'barChart',
          noCache: true
        }
      },
      {
        path: '/charts/line-chart',
        component: () => import('@/views/charts/Line'),
        name: 'LineChartDemo',
        meta: {
          title: 'lineChart',
          noCache: true
        }
      },
      {
        path: '/charts/Pie-chart',
        component: () => import('@/views/charts/Pie'),
        name: 'PieDemo',
        meta: {
          title: 'PieDemo',
          noCache: true
        }
      }
    ]
  }
]

export default chartsRouter
