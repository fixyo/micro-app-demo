import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import SidebarItem from './SideBarItem'

import '../../style/sidebar.scss'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup(props, ctx) {
    const store = useStore()
    const routes = computed(() => {
      return store.state.permission.routes
    })
    const rotue = useRoute()
    const activeMenu = computed(() => {
      const { meta, path } = rotue
      if (meta) {
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      return path
    })

    const router = useRouter()
    const handleMenuClick = (routePath: string) => {
      router.push({ path: routePath })
    }

    const isOpen = computed(() => {
      return store.state.app.sidebar.isOpen
    })

    return () => (
      <div class={['sidebar-container']}>
        <el-scrollbar height="100%">
          <el-menu
            class="el-menu-vertical-demo"
            collapse={!isOpen.value}
            background-color="#283046"
            text-color="#fff"
            default-active={activeMenu.value}
            onSelect={handleMenuClick}
            collapse-transition={true}
          >
            {routes.value.map((item) => {
              if (item.meta && item.meta.hideInMenu) {
                return null
              }
              return <SidebarItem menu={item} basePath={item.path}></SidebarItem>
            })}
          </el-menu>
        </el-scrollbar>
      </div>
    )
  }
})
