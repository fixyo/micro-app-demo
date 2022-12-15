import { defineComponent, Transition, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import '@/style/index.scss'

export default defineComponent({
  setup() {
    return () => {
      return (
        <RouterView>
          {/* {({ Component }: { Component: any }) => (
            <Transition>
              <KeepAlive>
                <Component />
              </KeepAlive>
            </Transition>
          )} */}
        </RouterView>
      )
    }
  }
})
