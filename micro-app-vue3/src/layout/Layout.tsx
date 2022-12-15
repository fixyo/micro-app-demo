import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from './components/sidebar/Sidebar'
import NavgationBar from './components/navgationBar/NavgationBar'
import TagsView from './components/tagsview/TagsView'
import Bmap from '@/components/Bmap/Bmap'
import './style/layout.scss'

export default defineComponent({
  setup() {
    return () => {
      return (
        <div class="app-layout">
          {/* <div class="sidenav">side bar</div> */}
          <Sidebar />
          <div class="border app-layout-right">
            <div class="topnav">
              <NavgationBar />
              <TagsView></TagsView>
            </div>
            <div class="main" style="position: relative">
              <RouterView>
                {/* {({ Component }: { Component: any }) => (
                      <Transition>
                        <KeepAlive>
                          <Component />
                        </KeepAlive>
                      </Transition>
                  )} */}
              </RouterView>
            </div>
          </div>
        </div>
      )
    }
  }
})
