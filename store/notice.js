/*
 * @Author: Superficial
 * @Date: 2020-09-03 15:51:51
 * @LastEditTime: 2020-09-07 18:22:18
 * @Description: 公告数据
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
    commit('updateFetching', true)
    return this.$axios
      .$get('/notices', { params })
      .then((res) => {
        commit('updateListData', res)
        commit('updateFetching', false)
        return Promise.resolve(res)
      })
      .catch((error) => {
        commit('updateFetching', false)
        return Promise.reject(error)
      })
  },
}
