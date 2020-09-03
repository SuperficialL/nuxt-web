<template>
  <div class="index-page">
    <carrousel :article="article" />
    <Notice :notice="notice" />
    <article-list :article="article" @loadmore="loadmoreArticle" />
  </div>
</template>

<script>
import ArticleList from '@/components/archive/list'
import Carrousel from '~/components/archive/carousel'
import Notice from '~/components/archive/notice'

export default {
  name: 'Index',
  components: {
    Carrousel,
    Notice,
    ArticleList,
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('article/fetchList'),
      store.dispatch('notice/fetchList'),
    ])
  },
  computed: {
    article() {
      return this.$store.state.article.list
    },
    notice() {
      return this.$store.state.notice
    },
    isMobile() {
      return this.$store.state.global.isMobile
    },
    nextPageParams() {
      return {
        page: this.article.data.pagination.page + 1,
      }
    },
  },
  methods: {
    loadmoreArticle() {
      this.$store.dispatch('article/fetchList', this.nextPageParams)
    },
  },
}
</script>
