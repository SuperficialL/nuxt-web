/*
 * @Author: SuperficialL
 * @Date: 2020-07-03 01:09:26
 * @LastEditTime: 2020-07-11 17:08:30
 * @Description: 文章数据
 */
export const state = () => {
  return {
    articles: {
      data: [],
      isFetching: false,
    },
    article: {},
    hotArticles: [],
    pagination: {},
  }
}

export const mutations = {
  // 更新列表
  updateArticles(state, res) {
    state.articles.data = res.data
  },

  // 更新列表
  updateHotArticles(state, res) {
    state.hotArticles = res.data
  },

  // 更新列表
  updatePagination(state, res) {
    state.pagination = res.pagination
  },

  // 更新详情
  updateDetailData(state, res) {
    state.article = res
  },

  // 喜欢某篇文章
  updateLikesIncrement(state) {
    const article = state.article.data
    article && article.likes++
  },
}

export const actions = {
  // 获取文章列表
  fetchList({ commit }, params = {}) {
    return this.$axios
      .$get('/api/articles', { params })
      .then((res) => {
        commit('updateArticles', res.result)
        commit('updatePagination', res.result)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  // 获取热门文章列表
  fetchHotList({ commit }) {
    return this.$axios
      .$get('/api/articles', { params: { hot: 1 } })
      .then((res) => {
        commit('updateHotArticles', res.result)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  // 获取文章详情
  getArticleDetail({ commit }, article = {}) {
    return this.$axios
      .$get(`/api/articles/${article.id}`)
      .then((res) => {
        commit('updateDetailData', res.result)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  // 喜欢文章
  fetchLikeArticle({ commit }, article) {
    return this.$axios.$post('api/like', article).then((res) => {
      commit('updateLikesIncrement')
      return Promise.resolve(res)
    })
  },
}
