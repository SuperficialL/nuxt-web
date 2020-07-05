/*
 * @Author: SuperficialL
 * @Date: 2019-11-15 22:49:46
 * @LastEditTime: 2020-07-04 16:18:59
 * @Description: 工具函数
 */

import Vue from 'vue'
import dateFormat from '../filters/dateFormat'

const filters = {
  dateFormat,
}

Object.keys(filters).forEach((key) => {
  return Vue.filter(key, filters[key])
})

export default dateFormat
