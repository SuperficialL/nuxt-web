/*
 * @Author: SuperficialL
 * @Date: 2020-07-04 23:06:58
 * @LastEditTime: 2020-07-06 01:02:15
 * @Description: 标签数据
 */

export const state = () => {
  return {
    fetching: false,
    tags: [],
  }
}

export const mutations = {
  updateFetching(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.tags = action.result.data
  },
}

export const actions = {
  fetchList({ commit }, params) {
    return this.$axios
      .$get('/api/tags', { params })
      .then((response) => {
        commit('updateListData', response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
