import * as types from './mutations-types'

export const state = () => ({
  articles: [],
  total: 0,
  page: 1,
  detail: {},
  viewCount: 0,
})

export const mutations = {
  [types.UPDATE_ARTICLE_LIST](state, data) {
    state.articleList = data
  },

  [types.SET_ARTICLE_DETAIL](state, data) {
    state.detail = data
  },

  [types.SET_TOTAL](state, num) {
    state.total = num
  },

  [types.SET_PAGE](state, num) {
    state.page = num
  },

  [types.UPDATE_VIEW_COUNT](state, num) {
    state.viewCount = num
  },

  [types.UPDATE_OPINION](state, data) {
    // Object.keys(state.opinion).map(key => {
    // state.opinion[key].data = data[key]
    // })
  },

  [types.UPDATE_OPINION_LOADING](state, { key, flag }) {
    state.opinion[key].isShowLaoding = flag
  },
}

export const actions = {
  // 获取文章列表
  async getArticleList({ commit }, params) {
    try {
      const {
        result: { data, pagination },
      } = await this.$axios.$get('/api/articles', {
        params,
        data: { progress: false },
      })

      commit(types.UPDATE_ARTICLE_LIST, data)
      commit(types.SET_TOTAL, pagination.total)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // 获取文章详情
  async getArticleDetail({ commit, rootState }, id) {},

  // 更新阅读量
  async updateArticleViewCount({ commit }, requestData) {},

  // 发表意见
  async updateOpinion({ commit }, requestData) {},
}
