/*
 * @Author: Superficial
 * @Date: 2020-08-31 14:42:13
 * @LastEditTime: 2020-08-31 14:59:54
 * @Description: title 彩蛋
 */

import { isBrowser } from '~/env'
let reallyTitle = isBrowser ? document.title : ''
let rollTimer = null

const titleInterval = 366
const defaultEgg = ` 皮皮虾，快回来！| SuperficialL Blog `

// 滚动器
const setTitle = title => {
  document.title = title
  if (title.length <= 10) {
    return false
  }
  const [first, ...content] = title.split('')
  const newTitle = [...content, first].join('')
  rollTimer = setTimeout(() => setTitle(newTitle), titleInterval)
}


 // 彩蛋
export const startTitleEgg = () => {
  reallyTitle = document.title
  setTitle(defaultEgg)
}

// 恢复默认
export const resetTitle = () => {
  clearTimeout(rollTimer)
  document.title = reallyTitle
}