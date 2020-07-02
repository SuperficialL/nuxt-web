import * as types from './mutations-types'

export const state = () => ({
  userInfo: {},
  menu: {},
  subMenu: {},
  links: [],
  articles: [],
  menuStatus: false,
})

export const mutations = {
  [types.UPDATE_GLOBAL_INFO](state, { userInfo, menu, subMenu, links }) {
    state.userInfo = userInfo
    state.menu = menu
    state.subMenu = subMenu
    state.links = links
  },

  [types.UPDATE_ERROR_MESSAGE](state, data) {
    state.errorInformation = data
  },

  [types.UPDATE_MENU](state, data) {
    state.menu = data
  },

  [types.UPDATE_MENU_STATUS](state, flag) {
    state.menuStatus = flag
  },

  [types.UPDATE_ARTICLE_LIST](state, articles) {
    state.articles = articles
  },
}

export const actions = {
  // 获取公用信息
  async nuxtServerInit({ commit }) {
    try {
      const { result } = await this.$axios.$get('/api/categories')
      // const { result: { data, pagination } } = await this.$axios.$get('/api/categories')
      const {
        result: { data },
      } = await this.$axios.$get('/api/articles')
      commit(types.UPDATE_MENU, result.data)
      commit(types.UPDATE_ARTICLE_LIST, data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  getMenu({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(types.UPDATE_MENU, [1, 2, 3, 4])
        resolve()
      }, 1000)
    })
  },
}
