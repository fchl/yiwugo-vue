// 获取实际图片地址
export default function getRealYwgImage(url?: string): string {
  const safeValue = url ?? ''
  if (safeValue.startsWith('http')) {
    return url
  }
  console.log(safeValue)
  return `/img/${safeValue}`
  // return `https://img1.yiwugo.com/${safeValue}`
}
