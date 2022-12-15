import { defineComponent } from 'vue'

import '@/style/test.scss'
export default defineComponent({
  setup() {
    return () => {
      return <h1 class="test">测试jsx
      <el-date-picker></el-date-picker>
      </h1>
    }
  }
})
