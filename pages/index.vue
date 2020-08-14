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
        page: this.article.data.pagination.current_page + 1,
      }
    },
  },
  methods: {
    loadmoreArticle() {
      // this.$store.dispatch('article/fetchList', this.nextPageParams)
    },
  },
  head() {
    return {
      title: '首页',
      meta: [
        { name: 'keywords', content: 'vuejs,nuxtjs,javascript,nodejs' },
        { name: 'description', content: '前端博客' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.index-page {
  // .carousel {
  //   position: relative;
  //   height: $pc-carrousel-height;
  //   overflow: hidden;
  //   border-radius: 4px;
  //   margin-bottom: 20px;
  //   &.mobile {
  //     overflow: hidden;
  //     margin: 0 5px 20px;
  //     height: $mobile-carrousel-height;
  //   }
  //   img {
  //     width: 100%;
  //     height: auto;
  //     overflow: hidden;
  //   }
  // }
  // .article-wrapper {
  //   padding: 8px 15px;
  //   background-color: #fff;
  //   border-radius: 6px;
  //   overflow: hidden;
  //   .tabs {
  //     display: flex;
  //     align-items: center;
  //     height: 30px;
  //     border-bottom: 1px solid #e9eaed;
  //     font-size: 16px;
  //     li {
  //       position: relative;
  //       display: flex;
  //       align-items: center;
  //       &.active {
  //         color: #08c;
  //       }
  //       &::after {
  //         content: '';
  //         position: absolute;
  //         bottom: -7px;
  //         left: 0;
  //         width: 100%;
  //         height: 2px;
  //         background-color: #08c;
  //       }
  //     }
  //   }
  // }
}
</style>
