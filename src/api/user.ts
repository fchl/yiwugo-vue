import request from '@/utils/request'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
  id: string
}

export interface UserState {
  userInfo?: UserInfoData
  coinInfo?: UserCoinData
}
export interface UserInfoData {
  id?: number
  nickname?: string
  icon?: string
}
export interface UserCoinData {
  coinCount: number
  rank: string
  level: number
}
export function login(data: LoginData): Promise<any> {
  // return request.post<LoginRes>('/user/login', data)
  return request.post<LoginRes>('/user/login', { username: data.username, password: data.password })
}

export function logout() {
  return request.post('/user/logout')
}

export function getUserInfo() {
  return request<UserState>('/user/lg/userinfo/json')
}

export function getEmailCode(): Promise<any> {
  return request.get('/user/email-code')
}

export function resetPassword(): Promise<any> {
  return request.post('/user/reset-password')
}

export function register(): Promise<any> {
  return request.post('/user/register')
}
