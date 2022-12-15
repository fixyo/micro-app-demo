import { setLanguage } from '@/utils/cookies'
import { defineComponent, PropType, ref, computed } from 'vue'
import { isTemplateNode } from 'vue/node_modules/@vue/compiler-core'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { AppActionTypes } from '@/store/modules/app/actionTypes'
import { ElMessage } from 'element-plus'

type Language = {
  name: string
  value: string
}

export default defineComponent({
  props: {
    isWhite: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props, ctx) {
    const store = useStore()
    const { locale, t } = useI18n()
    const languages = ref<Language[]>([
      {
        name: '英文',
        value: 'en'
      },
      {
        name: '中文',
        value: 'ch'
      }
    ])
    const setLang = (lang: Language) => {
      locale.value = lang.value
      store.dispatch(AppActionTypes.ACTION_SET_LANGUAGE, lang.value)

      ElMessage.success(t('settings.language'))
    }
    const currentLanguage = computed(() => {
      return store.state.app.language
    })
    return () => (
      <el-dropdown trigger="hover">
        {{
          default: () => {
            return (
              <svg
                font-size="45px"
                aria-hidden="true"
                class={['icon', { 'svg-color': props.isWhite }]}
              >
                <use xlinkHref="#iconzhongyingwen" />
              </svg>
            )
          },
          dropdown: () => {
            return (
              <el-dropdown-menu>
                {languages.value.map((language) => {
                  return (
                    <el-dropdown-item
                      onClick={() => setLang(language)}
                      key={language.value}
                      disabled={currentLanguage.value === language.value}
                    >
                      {language.name}
                    </el-dropdown-item>
                  )
                })}
              </el-dropdown-menu>
            )
          }
        }}
      </el-dropdown>
    )
  }
})
