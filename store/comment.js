/*
 * @Author: SuperficialL
 * @Date: 2020-07-06 01:04:33
 * @LastEditTime: 2020-07-27 14:58:04
 * @Description: 评论数据
 */

export const state = () => {
  return {
    fetching: false,
    hotComments: [],
    comments: {
      data: [],
      pagination: {},
    },
  }
}

export const mutations = {
  updateFetching(state, res) {
    state.fetching = res
  },
  // 清空评论
  clearListData(state) {
    state.comments = {
      data: [],
      pagination: [],
    }
  },

  // 获取列表
  updateListData(state, res) {
    state.comments = res.result
  },

  // 获取列表
  updateHotListData(state, res) {
    state.hotComments = res.result.data
  },

  // 更新评论列表
  updateListNewItemData(state, res) {
    state.comments.pagination.total += 1
    state.comments.data.push(res.result)
  },

  // 喜欢某条评论
  updateLikesIncrement(state, res) {
    state.comments.data.find((comment) => {
      const isMatched = comment.id === res.id
      isMatched && comment.likes++
      return isMatched
    })
  },
}

export const actions = {
  // 获取评论列表
  fetchList({ commit }, params = {}) {
    params = Object.assign({ page: 1, per_page: 15 }, params)
    return this.$axios
      .$get('/api/comments', { params })
      .then((res) => {
        commit('updateListData', res)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  // 获取评论列表
  fetchHotList({ commit }) {
    return this.$axios
      .$get('/api/comments', { params: { hot: 1 } })
      .then((res) => {
        commit('updateHotListData', res)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  // 发表评论
  fetchPostComment({ commit }, comment) {
    commit('updateFetching', true)
    return this.$axios
      .$post('/api/comments', comment, { progress: false })
      .then((res) => {
        commit('updateListNewItemData', res)
        commit('updateFetching', false)
      })
      .catch((err) => {
        commit('updateFetching', false)
        return Promise.reject(err)
      })
  },

  // 点赞评论
  fetchLikeComment({ commit }, comment) {
    return this.$axios
      .$post('/api/like', comment, { progress: false })
      .then((res) => {
        commit('updateLikesIncrement', comment)
        return Promise.resolve(res)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
