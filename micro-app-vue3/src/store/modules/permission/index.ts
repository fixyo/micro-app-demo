import { RootState } from '@/store'
import { RouteRecordRaw } from 'vue-router'
import { dynamicRoutes, constantRoutes } from '@/router'
import {
  MutationTree,
  ActionTree,
  ActionContext,
  Module,
  Store as VuexStore,
  CommitOptions
} from 'vuex'
import { state } from './state'
import type { PermissionState } from './state'

export { PermissionState }

// =============================================== methods
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    const { roles: permission } = route.meta
    return roles.some((role) => {
      if (permission.includes(role)) {
        return true
      }
      return false
    })
  }
  return true
}

const filterAsyncRoute = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (hasPermission(roles, route)) {
      const r = { ...route }

      if (route.children && route.children.length) {
        r.children = filterAsyncRoute(route.children, roles)
      }
      res.push(r)
    }
  })
  return res
}
// =============================================== methods

// =============================================== mutations
enum PermissionMutationTypes {
  SET_ROUTES = 'SET_ROUTES',
  SET_DYNAMIC_ROUTES = 'SET_DYNAMIC_ROUTES'
}

interface Mutations<S = PermissionState> {
  [PermissionMutationTypes.SET_ROUTES](state: S, payload: RouteRecordRaw[]): void
  [PermissionMutationTypes.SET_DYNAMIC_ROUTES](state: S, payload: RouteRecordRaw[]): void
}

const mutations: Mutations & MutationTree<PermissionState> = {
  [PermissionMutationTypes.SET_ROUTES](state, payload) {
    state.routes = constantRoutes.concat(payload)
    state.dynamicRoutes = payload
  },
  [PermissionMutationTypes.SET_DYNAMIC_ROUTES](state, payload) {
    state.dynamicRoutes = payload
  }
}
// =============================================== mutations

// =============================================== actions
export enum PermissionActionTypes {
  ACTION_SET_ROUTES = 'ACTION_SET_ROUTES'
}
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, RootState>, 'commit'>

export interface Actions {
  [PermissionActionTypes.ACTION_SET_ROUTES](
    { commit }: AugmentedActionContext,
    roles: string[]
  ): Promise<RouteRecordRaw[]>
}
const actions: ActionTree<PermissionState, RootState> & Actions = {
  async [PermissionActionTypes.ACTION_SET_ROUTES]({ commit }, roles) {
    if (roles.includes('super-admin')) {
      return dynamicRoutes
    }
    const routes = filterAsyncRoute(dynamicRoutes, roles)
    commit(PermissionMutationTypes.SET_ROUTES, routes)
    return routes
  }
}
// =============================================== actions

export type PermissionStore<S = PermissionState> = Omit<
  VuexStore<S>,
  'commit' | 'dispatch' | 'getters'
> & {
  // commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
    Options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1]
  ): ReturnType<Actions[K]>
}

export const store: Module<PermissionState, RootState> = {
  state,
  mutations,
  actions
}
