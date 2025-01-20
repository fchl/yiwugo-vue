import { Md5 } from 'ts-md5'
import request from '@/utils/requestYiwugo'

export async function queryProse(): Promise<any> {
  return request('/prose')
}

// 搜索
export async function search(page: number, key: string): Promise<any> {
  // console.log(`page---${page} `)
  return request.get('/search/s.htm', { params: { cpage: page, pagesize: 10, q: key } })
}

// 登录  application/x-www-form-urlencoded 方式
export async function login(name: string, passwd: string): Promise<any> {
  return request.post('/loginprocess.htm', { userName: name, password: Md5.hashStr(passwd) }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;' } })
}
