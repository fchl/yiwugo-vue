import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { showNotify } from 'vant'
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'

// 这里是用于设定请求后端时，所用的 Token KEY
// 可以根据自己的需要修改，常见的如 Access-Token，Authorization
// 需要注意的是，请尽量保证使用中横线`-` 来作为分隔符，
// 避免被 nginx 等负载均衡器丢弃了自定义的请求头
export const REQUEST_TOKEN_KEY = 'Access-Token'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
  headers: {
  // 默认 axios是Content-Type: applicatResponseBodyion/json请求
    // 公共请求头配置，本项目请求头大多数接口是这个，所以这里可以配置一下，对于特殊接口单独配置
    'Content-Type': 'application/x-www-form-urlencoded;',
  },
  // transformRequest: [data => Qs.stringify(data, { indices: true })] //将参数key=value序列化，因为本项目有的接口需要json/对象传参数，这里就不能这样直接全局配置，否则有的接口会报400(因为你把json或者是对象类型的数据，在这里key=value序列化了)

})

export type RequestError = AxiosError<{
  errorCode?: number
  data?: any
  errorMsg?: string
}>

// 异常拦截处理器
function errorHandler(error: RequestError): Promise<any> {
  if (error.response) {
    const { data = {}, status, statusText } = error.response
    // 403 无权限
    if (status === 403) {
      showNotify({
        type: 'danger',
        message: (data && data.errorMsg) || statusText,
      })
    }
    // 401 未登录/未授权
    if (status === 401 && data.data && data.data.isLogin) {
      showNotify({
        type: 'danger',
        message: 'Authorization verification failed',
      })
      // 如果你需要直接跳转登录页面
      // location.replace(loginRoutePath)
    }
  }
  return Promise.reject(error)
}

// 请求拦截器
function requestHandler(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  const savedToken = localStorage.getItem(STORAGE_TOKEN_KEY)
  // 如果 token 存在
  // 让每个请求携带自定义 token, 请根据实际情况修改
  console.log(`savedToken = ${savedToken}`)
  if (savedToken)
    config.headers[REQUEST_TOKEN_KEY] = savedToken

  return config
}

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler)

// 响应拦截器
function responseHandler(response: { data: any }) {
  return response.data
}

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler)

export default request
