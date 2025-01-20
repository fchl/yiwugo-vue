import { defineStore } from 'pinia'
import type { LoginData, UserInfoData } from '@/api/user'
import { clearToken } from '@/utils/auth'

import {
  getEmailCode,
  getUserInfo,
  resetPassword,
  login as userLogin,
  logout as userLogout,
  register as userRegister,
} from '@/api/user'

const InitUserInfo = {
  uid: 0,
  nickname: '',
  avatar: '',
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfoData>({ ...InitUserInfo })

  // Set user's information
  const setInfo = (partial: Partial<UserInfoData>) => {
    userInfo.value = { ...partial }
  }


  const login = async (loginForm: LoginData) => {
    try {
      const { data, errorCode } = await userLogin(loginForm)
      if (errorCode === 0) {
        console.log(data.id)
      }
    }
    catch (error) {
      clearToken()
      throw error
    }
  }

  const getInfo = async () => {
    try {
      const { data } = await getUserInfo()
      console.log(data.userInfo)
      setInfo(data.userInfo)
    }
    catch (error) {
      clearToken()
      throw error
    }
  }

  const logout = async () => {
    try {
      await userLogout()
    }
    finally {
      clearToken()
      setInfo({ ...InitUserInfo })
    }
  }

  const getCode = async () => {
    try {
      const data = await getEmailCode()
      return data
    }
    catch {}
  }

  const reset = async () => {
    try {
      const data = await resetPassword()
      return data
    }
    catch {}
  }

  const register = async () => {
    try {
      const data = await userRegister()
      return data
    }
    catch {}
  }

  return {
    userInfo,
    getInfo,
    login,
    logout,
    getCode,
    reset,
    register,
  }
}, {
  persist: true,
})

export default useUserStore
