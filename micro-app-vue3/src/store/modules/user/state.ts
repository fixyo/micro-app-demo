import { getToken } from '@/utils/cookies'

export interface UserInfo {
  token?: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

export interface UserState {
  token: string
  userInfo: UserInfo | null
}

export const state: UserState = {
  token: getToken() || '',
  userInfo: {
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    email: ''
  }
}
