/*
 * @Author: SuperficialL
 * @Date: 2020-07-03 01:09:26
 * @LastEditTime: 2020-07-06 00:47:45
 * @Description: 文章数据
 */
import * as types from './mutations-types'

export const state = () => {
  return {
    articles: [],
    total: 0,
    page: 1,
    per_page: 10,
    detail: {},
    viewCount: 0,
  }
}

export const mutations = {
  [types.UPDATE_ARTICLE_LIST](state, data) {
    state.articles = data
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
  getArticleList({ commit }, params = { page: 1 }) {
    return this.$axios
      .$get('/api/articles', { params })
      .then((res) => {
        const { data, pagination } = res.result
        commit(types.UPDATE_ARTICLE_LIST, data)
        commit(types.SET_TOTAL, pagination.total)
        commit(types.SET_PAGE, pagination.page)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
    // try {
    //   const {
    //     result: { data, pagination },
    //   } = await this.$axios.$get('/api/articles', {
    //     params,
    //     data: { progress: false },
    //   })
    //   commit(types.UPDATE_ARTICLE_LIST, data)
    //   commit(types.SET_TOTAL, pagination.total)
    //   commit(types.SET_PAGE, pagination.page)
    //   return Promise.resolve()
    // } catch (error) {
    //   return Promise.reject(error)
    // }
  },

  // 获取文章详情
  getArticleDetail({ commit }, params = {}) {
    return this.$axios
      .$get(`/api/articles/${params.id}`)
      .then((res) => {
        commit(types.SET_ARTICLE_DETAIL, res.result)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  // 更新阅读量
  updateArticleViewCount({ commit }, requestData) {},

  // 发表意见
  updateOpinion({ commit }, requestData) {},
}
