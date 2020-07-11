/*
 * @Author: SuperficialL
 * @Date: 2020-07-09 21:34:40
 * @LastEditTime: 2020-07-09 22:03:03
 * @Description: 缓存
 */

const get = (key) => localStorage.getItem(key)
const del = (key) => localStorage.removeItem(key)
const set = (key, data) => localStorage.setItem(key, data)

export const getStorageReader = (key) => {
  return {
    get: () => get(key),
    set: (data) => set(key, data),
    remove: () => del(key),
  }
}

export const getJSONStorageReader = (key) => {
  return {
    get() {
      const data = get(key)
      return data ? JSON.parse(data) : null
    },
    set(data) {
      set(key, JSON.stringify(data))
    },
    remove: () => del(key),
  }
}
