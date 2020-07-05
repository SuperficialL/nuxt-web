export const actions = {
  // 获取公用信息
  nuxtServerInit(store, { req }) {
    const initFetchData = [
      store.dispatch('tag/fetchList'),
      store.dispatch('category/fetchList'),
      store.dispatch('comment/fetchList'),
    ]

    return Promise.all(initFetchData)
  },
}
