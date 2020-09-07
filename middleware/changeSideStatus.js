/*
 * @Author: Superficial
 * @Date: 2020-07-27 16:41:36
 * @LastEditTime: 2020-09-07 20:49:56
 * @Description: 切换显示侧边栏
 */

export default ({ route, store }) => {
  const sideStatus = ['timeline', 'message', 'about'].includes(route.name)
  // set side status
  if (store.state.global.isShowSide !== sideStatus) {
    store.commit('global/updateSideStatus', sideStatus)
  }
}
