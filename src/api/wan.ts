import request from '@/utils/request'

// 首页顶部 tab
export interface NaviData {
  articles: ArticlesData[]
  cid: number
  name: string
}

export interface ArticlesData {
  author: string
  chapterName: string
  link: string
  niceDate: string
  title: string
}
// banner data
export interface BannerData {
  desc: string
  imagePath: string
  url: string
  title: string
}
//  首页文章列表 article/list/1/json
export function getArticleList(page: number): Promise<any> {
  return request.get(`/article/list/${page}/json`)
}

// banner数据
export function getHomeBanner(): Promise<any> {
  return request.get<BannerData>('/banner/json', { })
}
// 导航数据
export function getHomeTab(): Promise<any> {
  return request.get<NaviData>('/navi/json', { })
}
// 项目分类
export function getTreeData(): Promise<any> {
  return request.get('/project/tree/json', { })
}
// 项目列表数据
export function getTreeList(page: number, id: number): Promise<any> {
  const config = {
    params: {
      cid: id,
    },
  }
  return request.get(`/project/list/${page}/json`, config)
}
