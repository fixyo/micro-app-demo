import http, { RequestParams } from '@/utils/http'

const basePrefix = '/dev'

export const userLogin = <T>(params?: RequestParams) => {
  return http.post<T>(`${basePrefix}/user/login`, params)
}

export const getUserInfo = <T>(params?: RequestParams) => {
  return http.get<T>(`${basePrefix}/user/userInfo`)
}
