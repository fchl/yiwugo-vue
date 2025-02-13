// /d:/project/Git/wanVue/yiwugo-vue/src/utils/emjio-utils.ts

// Import the icons

const emjioKeys: string[] = ['[呲牙]', '[大笑]', '[哭]', '[大喊]', '[流汗]', '[睡着]', '[偷笑]', '[酷]', '[怒]', '[惊讶]', '[无聊]', '[鼓掌]', '[开心]', '[白眼]', '[鄙视]', '[闭嘴]', '[委屈]', '[疑问]', '[伤心]', '[再见]', '[强]', '[弱]', '[好的]', '[胜利]', '[拳头]', '[握手]']
// Define a mapping between text and icons
const iconMap: { [key: string]: string } = {
  '[呲牙]': '/public/emjio/f001.png',
  '[大笑]': '/public/emjio/f002.png',
  '[哭]': '/public/emjio/f003.png',
  '[大喊]': '/public/emjio/f004.png',
  '[流汗]': '/public/emjio/f005.png',
  '[睡着]': '/public/emjio/f006.png',
  '[偷笑]': '/public/emjio/f007.png',
  '[酷]': '/public/emjio/f008.png',
  '[怒]': '/public/emjio/f009.png',
  '[惊讶]': '/public/emjio/f010.png',
  '[无聊]': '/public/emjio/f011.png',
  '[鼓掌]': '/public/emjio/f012.png',
  '[开心]': '/public/emjio/f013.png',
  '[白眼]': '/public/emjio/f014.png',
  '[鄙视]': '/public/emjio/f015.png',
  '[闭嘴]': '/public/emjio/f016.png',
  '[委屈]': '/public/emjio/f017.png',
  '[疑问]': '/public/emjio/f018.png',
  '[伤心]': '/public/emjio/f019.png',
  '[再见]': '/public/emjio/f020.png',
  '[强]': '/public/emjio/f021.png',
  '[弱]': '/public/emjio/f022.png',
  '[好的]': '/public/emjio/f023.png',
  '[胜利]': '/public/emjio/f024.png',
  '[拳头]': '/public/emjio/f025.png',
  '[握手]': '/public/emjio/f026.png',

}

/**
 * Get the icon URL based on the provided text.
 * @param text The text to map to an icon.
 * @returns The URL of the corresponding icon.
 */
export function getEmjioByText(text: string): string | undefined {
  return iconMap[text]
}

export function getEmjioList(): { key: string, value: string }[] {
  const emjioList: { key: string, value: string }[] = []
  for (let i = 0; i < emjioKeys.length; i++) {
    const emjio = { key: emjioKeys[i], value: `/public/emjio/f0${(i + 1).toString().padStart(2, '0')}.png` }
    emjioList.push(emjio)
  }
  console.log(emjioList)
  return emjioList
}
