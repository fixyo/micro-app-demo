import { createStore, createLogger } from 'vuex'
import { store as app, AppStore, AppState } from '@/store/modules/app'
import { store as user, UserStore, UserState } from '@/store/modules/user'
import { store as permission, PermissionState } from '@/store/modules/permission'
import { store as tagsview, TagviewStore, TagviewState } from '@/store/modules/tagViews'
import type { PermissionStore } from '@/store/modules/permission'

export interface RootState {
  app: AppState
  user: UserState
  permission: PermissionState
  tagsview: TagviewState
}

export const store = createStore({
  modules: {
    app,
    user,
    permission,
    tagsview
  }
})

export type Store = AppStore<Pick<RootState, 'app'>> &
  UserStore<Pick<RootState, 'user'>> &
  PermissionStore<Pick<RootState, 'permission'>> &
  TagviewStore<Pick<RootState, 'tagsview'>>

export function useStore(): Store {
  return store as Store
}
