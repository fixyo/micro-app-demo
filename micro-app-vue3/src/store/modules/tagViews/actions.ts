import { RootState } from '@/store'
import { ActionContext, ActionTree } from 'vuex'
import { TagviewState } from '.'
import { Mutations, MutationTypes } from './mutations'
import { TagView, VisitedViews } from './state'

export enum TagsviewActions {
  ADD_VISITED_VIEW_ACTION = 'ADD_VISITED_VIEW_ACTION',
  ADD_CACHED_VIEW_ACTION = 'ADD_CACHED_VIEW_ACTION'
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<TagviewState, RootState>, 'commit'>

export interface Actions {
  [TagsviewActions.ADD_VISITED_VIEW_ACTION](
    { commit }: AugmentedActionContext,
    payload: TagView
  ): void
  [TagsviewActions.ADD_CACHED_VIEW_ACTION](
    { commit }: AugmentedActionContext,
    payload: TagView
  ): void
}

export const actions: ActionTree<TagviewState, RootState> & Actions = {
  [TagsviewActions.ADD_CACHED_VIEW_ACTION]({ commit }, payload) {
    commit(MutationTypes.ADD_CACHED_VIEW, payload)
  },
  [TagsviewActions.ADD_VISITED_VIEW_ACTION]({ commit }, payload) {
    commit(MutationTypes.ADD_VISITED_VIEW, payload)
  }
}
