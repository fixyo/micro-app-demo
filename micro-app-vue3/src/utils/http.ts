import axios, { AxiosRequestConfig } from 'axios'

import { useStore } from '@/store'
import { Method, ContentType } from './requestTypes'
import type { RequestParams } from './requestTypes'

export * from './requestTypes'

const instance = axios.create({
  timeout: 20000,
  headers: {
    'Content-Type': ContentType.json
  }
})

instance.interceptors.request.use(
  (config) => {
    const store = useStore()
    if (store.state.user && store.state.user.token) {
      config.headers.token = store.state.user.token
    }
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    Promise.reject(err)
  }
)
interface BaseResponse<T = null> {
  code: number
  data: T
  msg: string
}

const post = <T>(url: string, params: RequestParams = {}, options?: AxiosRequestConfig) => {
  return new Promise((resolve: (value: BaseResponse<T>) => void, reject) => {
    instance.post(url, params, options).then(
      (res) => {
        resolve(res.data as BaseResponse<T>)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

const get = <T>(url: string, params: RequestParams = {}, options?: AxiosRequestConfig) => {
  return new Promise((resolve: (value: BaseResponse<T>) => void, reject) => {
    instance.get(url, { params, ...options }).then(
      (res) => {
        resolve(res.data as BaseResponse<T>)
      },
      (err) => {
        reject(err)
      }
    )
  })
}
export { RequestParams }
export default { get, post }
