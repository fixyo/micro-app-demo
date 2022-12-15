import { defineComponent } from 'vue'
import ToggleSidebar from '@/components/ToggleSidebar/ToggleSidebar'
import SelectLang from '@/components/SelectLang/SelectLang'
import UserDropdown from './components/UserDropdown'

import '../../style/navgationBar.scss'

const NavgationBar = defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    return () => (
      <div class="navgation-bar">
        <ToggleSidebar />
        <div class="navgation-bar-operate">
          <SelectLang />
          <UserDropdown style="padding: 0 20px" />
        </div>
      </div>
    )
  }
})

export default NavgationBar
