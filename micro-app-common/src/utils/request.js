import axios from 'axios'
import store from '@/store'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
  baseURL: '',
  timeout: 60000
})

service.interceptors.request.use(
  config => {
    if (store.state.ticket) {
      config.headers['ticket'] =  store.state.ticket 
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(res => {
  const code = res.data.code
  if (code === 401) {
   return 
  } else {
    if (code === 6000) {
      // router.push({ path: "/licence", query: { message: res.data.msg } })
    } else {
      return res.data
    }
  }
},
  error => {
    console.log('[error]: ' + error)
    return Promise.reject(error)
  }
)

export default service
