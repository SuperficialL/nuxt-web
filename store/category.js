/*
 * @Author: SuperficialL
 * @Date: 2020-07-06 00:41:27
 * @LastEditTime: 2020-09-14 19:34:11
 * @Description: 分类数据
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
      .$get('/api/categories', { params })
      .then((res) => {
        commit('updateListData', res)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
