/*
 * @Author: Superficial
 * @Date: 2019-11-15 22:49:46
 * @LastEditTime: 2020-07-03 00:41:22
 * @Description: 工具函数
 */
/**
 * @description: 时间日期字符串
 * @param {time} 时间日期字符串
 * @return: 格式化后的时间字符串
 */
const dateFormat = (time) => {
  const date = new Date(time)
  const Time = {
    YY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    hh: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  }
  for (const key in Time) {
    Time[key] = Time[key] < 10 ? `0${Time[key]}` : `${Time[key]}`
  }
  return `${Time.YY}-${Time.MM}-${Time.DD} ${Time.hh}:${Time.mm}:${Time.ss}`
}

export default dateFormat
