<template>
  <div class="tag-page">
    <article-list :article="article" />
  </div>
</template>

<script>
import ArticleList from '@/components/archive/list'

export default {
  name: 'Tag',
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
  },
}
</script>