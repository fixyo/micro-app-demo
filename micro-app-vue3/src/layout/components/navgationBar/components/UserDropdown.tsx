import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/actions'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  // props: {},
  // emits: [],
  // components: {},
  setup(props, ctx) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const doLogout = () => {
      store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, true)
      router.push(`/login?redirect=${route.fullPath}`).catch((err) => {
        console.warn(err)
      })
    }
    return () => (
      <el-dropdown placement="bottom" trigger="click">
        {{
          default: () => {
            return (
              <div class="avatar-wrapper">
                <img style="width: 30px; height: 30px" src="/imgs/users/avatar.png" alt="" />
              </div>
            )
          },
          dropdown: () => {
            return (
              <el-dropdown-menu>
                <el-dropdown-item key={'logout'} onClick={doLogout}>
                  登出
                </el-dropdown-item>
              </el-dropdown-menu>
            )
          }
        }}
      </el-dropdown>
    )
  }
})
