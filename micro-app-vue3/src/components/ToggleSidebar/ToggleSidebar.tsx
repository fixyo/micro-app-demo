import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/actionTypes'
import './index.scss'
const ToggleSidebar = defineComponent({
  // props: {},

  setup(props, ctx) {
    const store = useStore()
    const toggleSidebar = () => {
      store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, true)
    }
    return () => (
      <div class="toggle-sidebar" onClick={toggleSidebar}>
        <svg
          class="icon"
          aria-hidden="true"
          style={{
            color: '#fff',
            transform: `rotate(${store.state.app.sidebar.isOpen ? 0 : '180deg'})`
          }}
          font-size="20px"
        >
          <use xlinkHref="#iconhamburger" />
        </svg>
      </div>
    )
  }
})

export default ToggleSidebar
