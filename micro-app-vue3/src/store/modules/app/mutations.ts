import { MutationTree } from 'vuex'
import { setLanguage, setSidebarStatus, setSize } from '@/utils/cookies'
import { AppMutationTypes } from './mutationTypes'
import { AppState, DeviceType } from './state'

export type Mutations<S = AppState> = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: S, withAnimation: boolean): void
  [AppMutationTypes.CLOSE_SIDEBAR](state: S, withAnimation: boolean): void
  [AppMutationTypes.SET_LANGUAGE](state: S, lang: string): void
  [AppMutationTypes.TOGGLE_DEVICE](state: S, deviceType: DeviceType): void
  [AppMutationTypes.SET_SIZE](state: S, size: string): void
}

export const mutations: MutationTree<AppState> & Mutations = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state, withAnimation) {
    state.sidebar.isOpen = !state.sidebar.isOpen
    state.sidebar.withAnimation = withAnimation
    if (state.sidebar.isOpen) {
      setSidebarStatus('open')
    } else {
      setSidebarStatus('closed')
    }
  },
  [AppMutationTypes.CLOSE_SIDEBAR](state, withAnimation) {
    state.sidebar.isOpen = false
    state.sidebar.withAnimation = withAnimation
    setSidebarStatus('closed')
  },
  [AppMutationTypes.SET_LANGUAGE](state, language) {
    state.language = language
    setLanguage(language)
  },
  [AppMutationTypes.TOGGLE_DEVICE](state, deviceType) {
    state.device = deviceType
  },
  [AppMutationTypes.SET_SIZE](state, size) {
    state.size = size
    setSize(size)
  }
}
