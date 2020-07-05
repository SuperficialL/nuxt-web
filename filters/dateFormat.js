/*
 * @Author: SuperficialL
 * @Date: 2020-07-04 16:15:26
 * @LastEditTime: 2020-07-04 16:15:55
 * @Description:日期时间过滤器
 * @FilePath: \blog\nuxt-web\filters\dateFormat.js
 * @可以输入预定的版权声明、个性签名、空行等
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
