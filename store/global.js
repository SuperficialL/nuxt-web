/*
 * @Author: Superficial
 * @Date: 2020-07-19 16:23:49
 * @LastEditTime: 2020-07-27 16:50:34
 * @Description: 全局配置
 */

export const state = () => {
  return {
    // ua
    userAgent: '',

    // 是否为移动端
    isMobile: false,

    // 是否显示侧边栏
    isShowSide: true,

    // 移动端侧边栏
    onMobileSidebar: false,

    // 服务端设置的全局配置
    appOption: {
      fetching: false,
      data: null,
    },

    // 统计数据
    statistic: {
      tags: 0,
      comments: 0,
      articles: 0,
      categories: 0,
    },
  }
}

export const getters = {
  isMobile: (state) => state.isMobile,
}

export const mutations = {
  // 设置UA
  updateUserAgent(state, action) {
    state.userAgent = action
  },

  // 切换移动端侧边栏
  updateMobileSidebarOnState(state, action) {
    state.onMobileSidebar = action
  },

  // 切换侧边栏状态
  updateSideStatus(state, status) {
    state.isShowSide = status
  },

  // 设置是否移动端状态
  updateMobileLayoutState(state, action) {
    state.isMobile = action
  },

  // 获取服务端配置
  updateAppOptionFetching(state, action) {
    state.appOption.fetching = action
  },

  // 获取全局信息
  updateStatistic(state, res) {
    state.statistic = res
  },
}

export const actions = {
  // 获取全局配置
  fetchAppOption({ commit }) {
    return this.$axios
      .$get('/option')
      .then((res) => {
        commit('updateAppOptionData', res)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  // 获取统计数据
  fetchSiteStatistic({ commit }) {
    return this.$axios
      .$get('/api/statistic')
      .then((res) => {
        commit('updateStatistic', res.result)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
