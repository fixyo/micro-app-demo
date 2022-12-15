import { viewDepthKey } from 'vue-router'
import { MutationTree } from 'vuex'
import { TagviewState } from '.'
import { TagView } from './state'

export enum MutationTypes {
  ADD_VISITED_VIEW = 'ADD_VISITED_VIEW',
  ADD_CACHED_VIEW = 'ADD_CACHED_VIEW',
  DEL_CACHED_VIEW = 'DEL_CACHED_VIEW',
  DEL_VISITED_VIEW = 'DEL_VISITED_VIEW'
}

export type Mutations<S = TagviewState> = {
  [MutationTypes.ADD_CACHED_VIEW](state: S, payload: TagView): void
  [MutationTypes.ADD_VISITED_VIEW](state: S, payload: TagView): void
  [MutationTypes.DEL_CACHED_VIEW](state: S, payload: TagView): void
  [MutationTypes.DEL_VISITED_VIEW](state: S, payload: TagView): void
}

export const mutations: MutationTree<TagviewState> & Mutations = {
  [MutationTypes.ADD_VISITED_VIEW](state, payload) {
    if (!state.visitedViews.some((view) => view.path === payload.path)) {
      state.visitedViews.push({ ...payload, title: payload.meta?.title || 'no-title' })
    }
  },
  [MutationTypes.ADD_CACHED_VIEW](state, payload) {
    if (!payload.name) return
    if (!state.cachedViews.includes(payload.name.toString())) {
      if (payload.meta?.cacheRoute) {
        state.cachedViews.push(payload.name.toString())
      }
    }
  },
  [MutationTypes.DEL_CACHED_VIEW](state, payload) {
    const index = state.cachedViews.findIndex((name) => name === payload.name)
    if (index > -1) {
      state.cachedViews.splice(index, 1)
    }
  },
  [MutationTypes.DEL_VISITED_VIEW](state, payload) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of state.visitedViews.entries()) {
      if (v.path === payload.path) {
        state.visitedViews.splice(k, 1)
        break
      }
    }
  }
}
