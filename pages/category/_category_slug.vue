<template>
  <div class="category-page">
    <article-list :article="article" @loadmore="loadmoreArticle" />
  </div>
</template>

<script>
import ArticleList from '@/components/archive/list'
export default {
  name: 'Category-Article-List',
  components: {
    ArticleList,
  },
  fetch({ store, params }) {
    return store.dispatch('article/fetchList', params)
  },
  computed: {
    article() {
      return this.$store.state.article.list
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
