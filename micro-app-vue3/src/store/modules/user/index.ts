import { RootState } from '@/store'
import { Store as VuexStore, Module, MutationTree, CommitOptions, DispatchOptions } from 'vuex'
import { UserInfo, state } from './state'
import type { UserState } from './state'

import { actions, Actions } from './actions'

export { UserState }

// ======================================= mutations
export enum UserMutationType {
  SET_USERINFO = 'SET_USERINFO',
  SET_USERTOKEN = 'SET_USERTOKEN',
  SET_ROLES = 'SET_ROLES'
}

export type Mutations<S = UserState> = {
  [UserMutationType.SET_USERINFO](state: S, userInfo: UserInfo | null): void
  [UserMutationType.SET_USERTOKEN](state: S, token: string): void
  // [UserMutationType.SET_ROLES](state: S, roles: string[]): void
}

export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationType.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [UserMutationType.SET_USERTOKEN](state, token) {
    state.token = token
  }
}

export type UserStore<S = UserState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store: Module<UserState, RootState> = {
  state,
  mutations,
  actions
}
