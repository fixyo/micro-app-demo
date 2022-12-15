import { RootState } from '@/store'
import { Commit, CommitOptions, DispatchOptions, Module, Store } from 'vuex'
import { state } from './state'
import type { TagviewState } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'

export { TagviewState }

export type TagviewStore<S = TagviewState> = Omit<Store<S>, 'commit' | 'getters' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    k: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store: Module<TagviewState, RootState> = {
  state,
  mutations,
  actions
}
