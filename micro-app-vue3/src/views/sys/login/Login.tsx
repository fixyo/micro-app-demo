import { defineComponent, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/actions'
import SelectLang from '@/components/SelectLang/SelectLang'
import './style/index.scss'
import { useRouter } from 'vue-router'
import { L2Dwidget } from 'live2d-widget'

export default defineComponent({
  props: {},
  emits: [],
  components: {},

  setup(props, ctx) {
    const loginParams = ref({
      password: 'admin',
      username: 'admin'
    })
    const { t } = useI18n()
    const store = useStore()
    const router = useRouter()

    const doLogin = async () => {
      if (!loginParams.value.password || !loginParams.value.username)
        return ElMessage.warning(t('login.emptyHint'))

      const success = await store.dispatch(UserActionTypes.ACTION_LOGIN, loginParams.value)

      if (success) {
        router.push({ name: 'Dashboard' })
      }
    }

    onMounted(() => {
      L2Dwidget.init({
        model: {
          jsonPath: 'https://unpkg.com/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json'
        },
        display: {
          position: 'left',
          width: 75,
          height: 150,
          hOffset: 0,
          vOffset: -20
        }
      })
    })

    return () => (
      <div class="login">
        <video poster="/imgs/login/video-cover.jpeg" muted autoplay loop>
          <source src="/imgs/login/night.mp4" />
        </video>
        <div class="login-form">
          <h3 style={{ color: '#ccc' }}>{t('login.title')}</h3>
          <el-form>
            <el-form-item>
              <el-input v-model={loginParams.value.username} placeholder={t('login.username')} />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model={loginParams.value.password}
                type="password"
                placeholder={t('login.password')}
              />
            </el-form-item>
            <el-form-item>
              <el-button size="large" type="primary" style="width: 100%" onClick={doLogin}>
                {t('login.logIn')}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="language-setting">
          <SelectLang />
        </div>
      </div>
    )
  }
})
