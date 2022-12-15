import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { userLogin, getUserInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/cookies'
import { userInfo } from 'os'
import { restRouter } from '@/router'
import { Mutations, UserMutationType } from './index'
import { UserState, UserInfo } from './state'

export enum UserActionTypes {
  ACTION_LOGIN = 'ACTION_LOGIN',
  ACTION_LOGOUT = 'ACTION_LOGOUT',
  ACTION_GET_USER_INFO = 'ACTION_GET_USER_INFO',
  ACTION_RESET_TOKEN = 'ACTION_RESET_TOKEN'
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    loginInfo: { username: string; password: string }
  ): Promise<any>
  [UserActionTypes.ACTION_GET_USER_INFO](
    { commit }: AugmentedActionContext,
    token: string
  ): Promise<any>
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext, isLogout?: boolean): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    loginParam: { username: string; password: string }
  ) {
    const { code, msg, data } = await userLogin<{ accessToken: string }>(loginParam)
    if (code === 0) {
      if (data && data.accessToken) {
        setToken(data.accessToken)
        commit(UserMutationType.SET_USERTOKEN, data.accessToken)
      }
      return true
    }
    return false
  },
  async [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext, token: string) {
    const { code, data } = await getUserInfo<UserInfo>()
    if (code === 0) {
      commit(UserMutationType.SET_USERINFO, data)
      return true
    }
    return false
  },
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext, isLogout?: boolean) {
    removeToken()
    commit(UserMutationType.SET_USERTOKEN, '')
    commit(UserMutationType.SET_USERINFO, null)

    if (isLogout) {
      restRouter()
    }
  }
}
