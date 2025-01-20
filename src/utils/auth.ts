import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'

// 从本地缓存中获取
// const token = useLocalStorage(STORAGE_TOKEN_KEY, '')
// 从cookie获取
const token = getCookie(STORAGE_TOKEN_KEY)

function getCookie(name) {
  // 获取所有的 Cookie
  const cookies = document.cookie.split('; ')
  // 遍历每一个 Cookie
  for (const cookie of cookies) {
    // 使用 `=` 分割 Cookie 的名称和值
    const [key, value] = cookie.split('=')
    // 如果名称匹配，返回对应的值
    if (key === name) {
      return decodeURIComponent(value)
    }
  }
  // 如果没有找到，返回 null
  return null
}
function isLogin() {
  return !!token
}

function getToken() {
  return token
}

function clearToken() {

}

export { isLogin, getToken, clearToken }
