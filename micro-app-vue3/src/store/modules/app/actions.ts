import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { Mutations } from './mutations'
import { AppMutationTypes } from './mutationTypes'
import { AppActionTypes } from './actionTypes'
import { AppState, DeviceType } from './state'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<AppState, RootState>, 'commit'>

export interface Actions {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR](
    { commit }: AugmentedActionContext,
    withAnimation: boolean
  ): void
  [AppActionTypes.ACTION_CLOSE_SIDEBAR](
    { commit }: AugmentedActionContext,
    withAnimation: boolean
  ): void
  [AppActionTypes.ACTION_TOGGLE_DEVICE](
    { commit }: AugmentedActionContext,
    device: DeviceType
  ): void
  [AppActionTypes.ACTION_SET_LANGUAGE]({ commit }: AugmentedActionContext, language: string): void
  [AppActionTypes.ACTION_SET_SIZE]({ commit }: AugmentedActionContext, language: string): void
}

export const actions: ActionTree<AppState, RootState> & Actions = {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR]({ commit }, withAnimation) {
    commit(AppMutationTypes.TOGGLE_SIDEBAR, withAnimation)
  },
  [AppActionTypes.ACTION_CLOSE_SIDEBAR]({ commit }, withAnimation) {
    commit(AppMutationTypes.CLOSE_SIDEBAR, withAnimation)
  },
  [AppActionTypes.ACTION_SET_LANGUAGE]({ commit }, language) {
    commit(AppMutationTypes.SET_LANGUAGE, language)
  },
  [AppActionTypes.ACTION_SET_SIZE]({ commit }, language) {
    commit(AppMutationTypes.SET_SIZE, language)
  },
  [AppActionTypes.ACTION_TOGGLE_DEVICE]({ commit }, deviceType) {
    commit(AppMutationTypes.TOGGLE_DEVICE, deviceType)
  }
}
