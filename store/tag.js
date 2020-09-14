/*
 * @Author: SuperficialL
 * @Date: 2020-07-04 23:06:58
 * @LastEditTime: 2020-09-14 19:35:18
 * @Description: 标签数据
 */

export const state = () => {
  return {
    fetching: false,
    data: [],
  }
}

export const mutations = {
  updateFetching(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.data = action.result.data
  },
}

export const actions = {
  fetchList({ commit }, params) {
    return this.$axios
      .$get('/api/tags', { params })
      .then((res) => {
        commit('updateListData', res)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
