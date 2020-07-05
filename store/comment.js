/*
 * @Author: SuperficialL
 * @Date: 2020-07-06 01:04:33
 * @LastEditTime: 2020-07-06 01:07:35
 * @Description: 评论数据
 */

export const state = () => {
  return {
    fetching: false,
    comments: [],
  }
}

export const mutations = {
  updateFetching(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.comments = action.result.data
  },
}

export const actions = {
  fetchList({ commit }, params) {
    return this.$axios
      .$get('/api/comments', { params })
      .then((res) => {
        commit('updateListData', res)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
