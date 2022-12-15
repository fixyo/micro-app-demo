import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'
import i18n from '@/locales'

export default (app: any) => {
  app.use(ElementPlus, { size: 'small', i18n: i18n.global.t })
}
