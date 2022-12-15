import { defineComponent } from 'vue'
import RichEditor from '@/components/RichEditor/RichEditor.vue'
import ScreenAdapter from './components/ScreenAdapter'
import Bmap from '@/components/Bmap/Bmap'
import BigScreenBody from './components/BigScreenBody'
import BigScreenHeader from './components/BigScreenHeader'
import './style/dashboard.scss'

export default defineComponent({
  props: {},
  components: {
    BigScreenBody
  },
  setup(props, ctx) {
    return () => (
      <ScreenAdapter>
        {{
          default: () => {
            return (
              <div class="dashboard border">
                <BigScreenHeader />
                <BigScreenBody />
              </div>
            )
          },
          bg: () => {
            return <Bmap />
          }
        }}
      </ScreenAdapter>
    )
  }
})
