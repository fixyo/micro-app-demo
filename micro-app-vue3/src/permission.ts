import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { ElMessage } from 'element-plus'

import router from '@/router'
import { useStore } from './store'
import { UserActionTypes } from './store/modules/user/actions'
import { PermissionActionTypes } from './store/modules/permission'

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const store = useStore()
  const { token, userInfo } = store.state.user

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else if (userInfo?.roles.length === 0) {
      try {
        // TODO: 接口返回成功后才跳转
        const success = await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, token)
        const dynamicRoutes = await store.dispatch(
          PermissionActionTypes.ACTION_SET_ROUTES,
          store.state.user.userInfo?.roles || []
        )
        dynamicRoutes.forEach((route) => {
          router.addRoute(route)
        })
        NProgress.done()
        // next()
        next({ ...to, replace: true })
      } catch (error) {
        store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined)
        ElMessage.error('Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
        next('/login')
      }
    } else {
      next()
    }
  } else if (to.path === '/login') {
    next()
  } else {
    next('/login')
  }
  NProgress.done()
})
