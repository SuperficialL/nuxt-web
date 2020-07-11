/*
 * @Author: SuperficialL
 * @Date: 2020-07-04 23:06:58
 * @LastEditTime: 2020-07-11 17:41:14
 * @Description: 友链数据
 */

export const state = () => {
  return {
    fetching: false,
    links: [],
  }
}

export const mutations = {
  updateFetching(state, res) {
    state.fetching = res
  },
  updateListData(state, res) {
    state.links = res.data
  },
}

export const actions = {
  fetchList({ commit }, params) {
    return this.$axios
      .$get('/api/links', { params })
      .then((res) => {
        commit('updateListData', res.result)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
