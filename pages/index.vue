<template>
  <div class="index-page">
    <carrousel :article="article" />
    <article-list :article="article" @loadmore="loadmoreArticle" />
  </div>
</template>

<script>
import ArticleList from '@/components/archive/list'
import Carrousel from '~/components/archive/carousel'

export default {
  name: 'Index',
  components: {
    Carrousel,
    ArticleList,
  },
  fetch({ store, params }) {
    return store.dispatch('article/fetchList')
  },
  computed: {
    article() {
      return this.$store.state.article.list
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
  }
}
</script>
