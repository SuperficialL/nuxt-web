/*
 * @Author: Superficial
 * @Date: 2020-08-28 14:37:18
 * @LastEditTime: 2020-09-14 15:09:59
 * @Description: api接口配置
 */

import { NODE_ENV } from '../environment'

const apiMap = {
  development: {
    BASE: 'http://127.0.0.1:3000',
  },
  production: {
    BASE: 'https://api.zhangwurui.net',
  },
}

export default apiMap[NODE_ENV]
