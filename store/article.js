/*
 * @Author: SuperficialL
 * @Date: 2020-07-03 01:09:26
 * @LastEditTime: 2020-08-16 22:02:56
 * @Description: 文章数据
 */
import Vue from 'vue'
import { isBrowser } from '~/env'
import { scrollTo, Easing } from '~/utils'

const getDefaultListData = () => {
  return {
    data: [],
    pagination: {},
  }
}

export const state = () => {
  return {
    list: {
      fetching: false,
      data: getDefaultListData(),
    },
    hotList: [],
    detail: {
      fetching: false,
      data: {},
    },
  }
}

export const mutations = {
  // 文章列表
  updateListFetching(state, action) {
    state.list.fetching = action
  },

  updateListData(state, data) {
    state.list.data = data
  },

  updateExistingListData(state, res) {
    state.list.data.data.push(...res.data)
    state.list.data.pagination = res.pagination
  },

  // 热门文章
  updateHotListData(state, action) {
    state.hotList = action.result.data
  },

  // 文章详情
  updateDetailFetching(state, action) {
    state.detail.fetching = action
  },
  updateDetailData(state, action) {
    state.detail.data = action
  },

  // 更新文章阅读全文状态
  updateDetailRenderedState(state, action) {
    Vue.set(
      state.detail.data,
      'isRenderedFullContent',
      action == null ? true : action
    )
  },

  // 喜欢某篇文章
  updateLikesIncrement(state) {
    const article = state.detail.data
    article && article.likes++
  },
}

export const actions = {
  // 获取文章列表
  fetchList({ commit }, params = {}) {
    const isRestart = !params.page || params.page === 1
    const isLoadMore = params.page && params.page > 1

    // 清空已有数据
    isRestart && commit('updateListData', getDefaultListData())
    commit('updateListFetching', true)

    return this.$axios
      .$get('/api/articles', { params })
      .then((res) => {
        commit('updateListFetching', false)
        isLoadMore
          ? commit('updateExistingListData', res.result)
          : commit('updateListData', res.result)
        if (isLoadMore && isBrowser) {
          Vue.nextTick(() => {
            scrollTo(window.scrollY + window.innerHeight * 0.8, 300, {
              easing: Easing['ease-in'],
            })
          })
        }
      })
      .catch(() => {
        commit('updateListFetching', false)
      })
  },

  // 获取热门文章列表
  fetchHotList({ commit }) {
    return this.$axios
      .$get('/api/articles', { params: { is_top: 1 } })
      .then((res) => {
        commit('updateHotListData', res)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  // 获取文章详情
  getArticleDetail({ commit }, article = {}) {
    return this.$axios
      .$get(`/api/articles/${article.id}`)
      .then((res) => {
        commit('updateDetailData', res.result)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  // 喜欢文章
  fetchLikeArticle({ commit }, article) {
    return this.$axios.$post('api/like', article).then((res) => {
      commit('updateLikesIncrement')
      return Promise.resolve(res)
    })
  },
}
