<template>
  <div class="tag-page">
    <article-list :article="article" @loadmore="loadmoreArticle" />
  </div>
</template>

<script>
import ArticleList from '@/components/archive/list'

export default {
  name: 'Tag-Article-List',
  components: {
    ArticleList,
  },
  fetch({ store, params }) {
    return store.dispatch('article/fetchList', params)
  },
  created() {
    if (!this.currentTag) {
      this.$router.back()
    }
  },
  computed: {
    article() {
      return this.$store.state.article.list
    },
    currentTag() {
      return this.$store.state.tag.data.find((tag, index, arr) => {
        return Object.is(tag.slug, this.$route.params.tag_slug)
      })
    },
    defaultParams() {
      return {
        tag_slug: this.$route.params.tag_slug,
      }
    },
    nextPageParams() {
      return Object.assign(
        {
          page: this.article.data.pagination.page + 1,
        },
        this.defaultParams
      )
    },
  },
  methods: {
    loadmoreArticle() {
      this.$store.dispatch('article/fetchList', this.nextPageParams)
    },
  },
}
</script>
