
<script>
import Login from 'micro-app-common/src/components/login'
import actions from "@/shared/actions";
import {setToken} from '@/utils/cookies'
export default {
  extends: Login,
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      try {
        const res = await this.form.validateFields()
        if (res) {
          const token = 'mockToken'
          const refreshToken = 'refreshToken'
          actions.setGlobalState({token})
          setToken(token, 'tk')
          setToken(refreshToken, 'rtk')
          this.$router.push("/")
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  components:{ 
    // Login
  }
}
</script>

<style>

</style>