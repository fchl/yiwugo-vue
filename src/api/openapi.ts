import request from '@/utils/requestApi'

export async function querySentences(): Promise<any> {
  return request('/sentences')
}

// type animal/beauty/car/comic/food/game/movie/person/phone/scenery
export async function getImages(cPage: number, keyword: string): Promise<any> {
  const param = { page: cPage, size: 10, type: keyword }
  return request.get('/getImages', { params: param })
}

export async function getShortVideo(cPage: number): Promise<any> {
  const param = { page: cPage, size: 10 }
  return request.get('/getHaoKanVideo', { params: param })
}
