/*
 * @Author: Superficial
 * @Date: 2020-07-19 16:23:49
 * @LastEditTime: 2020-07-19 18:43:22
 * @Description: 全局配置
 */

export const state = () => {
  return {
    // ua
    userAgent: '',

    // 是否为移动端
    isMobile: false,

    // 移动端侧边栏
    onMobileSidebar: false,
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

  // 设置是否移动端状态
  updateMobileLayoutState(state, action) {
    state.isMobile = action
  },
}
