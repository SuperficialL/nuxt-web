<template>
  <div class="container">
    <div class="breadcrumb">
      <div class="category-title">
        <h4>当前分类: {{ $route.params.slug }}</h4>
        <span>共 {{ total }} 篇</span>
      </div>
    </div>
    <section class="article-wrapper">
      <article-list :articles="articles" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleList from '@/components/ArticleList'
export default {
  name: 'Category',
  components: {
    ArticleList,
  },
  fetch({ store, query, params }) {
    // store.commit('article/SET_CURRENT_PAGE', +params.slug)
    return store.dispatch('article/getArticleList', {
      category_slug: params.slug,
    })
  },
  computed: {
    ...mapState('article', ['articles', 'total']),
  },
  watch: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.container {
  .category-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 6px;
  }
  .article-wrapper {
    padding: 8px 15px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
  }
}
</style>
