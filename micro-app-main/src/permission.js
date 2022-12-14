
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css' 
import { getToken } from '@/utils/cookies'
import { getMenusApi } from 'micro-app-common/src/api'
const whiteList = ['/login']

export default {
  install: (Vue, options = {}) => {
    const router = options.router 
    const store = options.store 
    console.log(store, 'store')
    const getMenus = options.getMenusApi || getMenusApi
    router.beforeEach(async(to, from, next) => {
      NProgress.start()

      const token = getToken('tk')
      console.log(token)
      const {menu, user} = store.state.common
      if (token) {
        if (to.path === '/login') {
          console.log('已登录 想去login')
          return next(from.path)
        }
        if (!menu || !menu.length) {
          const rowMenu = await getMenus()
          store.commit('common/setMenus', rowMenu)
          next()
          // store.dispatch('common/generateRoutes', getMenus).then(() => {
          //   router.options.routes = store.getters.routes
          //   router.addRoutes(store.getters.addRoutes) // 动态添加可访问路由表
          //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          //   NProgress.done()
          // })
        } else {
          next()
        }
        const hasUserInfo = user.name
        if (!hasUserInfo) {
          const userInfo = await store.dispatch('common/getUserInfo')
          console.log('userInfo', userInfo)
        }
      } else {
        if (whiteList.includes(to.path)) {
          next()
        } else {
          next('/login')
        }
      }
    })
  
    router.afterEach(() => {
      NProgress.done()
    })
  }
}




