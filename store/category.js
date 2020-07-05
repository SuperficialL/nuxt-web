/*
 * @Author: SuperficialL
 * @Date: 2020-07-06 00:41:27
 * @LastEditTime: 2020-07-06 00:54:10
 * @Description: 分类数据
 */

export const state = () => {
  return {
    fetching: false,
    menu: [],
  }
}

export const mutations = {
  updateFetching(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.menu = action.result.data
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
