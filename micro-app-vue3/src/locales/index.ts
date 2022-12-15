/* eslint-disable no-restricted-syntax */
import { createI18n } from 'vue-i18n'
import { getLanguage } from '@/utils/cookies'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'

import enLocale from './en'
import zhLocale from './ch'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  ch: {
    ...zhLocale,
    ...elementZhLocale
  }
}

export const getLocal = () => {
  const currentLang = getLanguage()

  if (currentLang) {
    return currentLang
  }

  const lang = navigator.language.toLocaleLowerCase()
  const locales = Object.keys(messages)

  for (const key of Object.keys(locales)) {
    if (lang.indexOf(key) > -1) {
      return key
    }
  }

  return 'ch'
}

// console.log(getLocal(), 'getLocal')
// console.log(message, 'message')

const i18n = createI18n({
  locale: getLocal(),
  messages
})

export default i18n
