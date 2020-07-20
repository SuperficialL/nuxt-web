import { uaParser } from '@/utils'

export const actions = {
  // 获取公用信息
  nuxtServerInit(store, { req }) {
    // 检测设备类型 pc  mobile
    const isServer = process.server
    // const userLanguage = isServer
    //   ? req.headers['accept-language']
    //   : navigator.language
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const { isMobile, isWechat, isIE, isSafari } = uaParser(userAgent)

    store.commit('global/updateUserAgent', userAgent)
    store.commit('global/updateMobileLayoutState', isMobile)

    console.log({ isMobile, isWechat, isIE, isSafari })

    // const isZHUser =
    //   !userLanguage || userLanguage.includes(systemConstants.Language.Zh)

    const initFetchData = [
      store.dispatch('category/fetchList'),
      store.dispatch('link/fetchList'),
    ]

    // 如果不是移动端的话，则请求热门文章
    if (!isMobile) {
      initFetchData.push(store.dispatch('tag/fetchList'))
      initFetchData.push(store.dispatch('article/fetchHotList'))
      initFetchData.push(store.dispatch('comment/fetchHotList'))
    }

    return Promise.all(initFetchData)
  },
}
