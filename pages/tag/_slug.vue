<template>
  <div class="container">
    <div class="breadcrumb">
      <div class="tag-title">
        <h4>当前分类: {{ params.tag_slug }}</h4>
        <span>共 {{ pagination.total || 0 }} 篇</span>
      </div>
    </div>
    <section class="article-wrapper">
      <article-list :articles="articles.data" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleList from '@/components/ArticleList'

export default {
  name: 'Tag',
  components: {
    ArticleList,
  },
  fetch({ store, params }) {
    return store.dispatch('article/fetchList', {
      tag_slug: params.slug,
    })
  },
  computed: {
    ...mapState('article', ['articles', 'params', 'pagination']),
  },
}
</script>

<style lang="scss" scoped>
.container {
  .tag-title {
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
