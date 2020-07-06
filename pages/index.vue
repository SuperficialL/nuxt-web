<template>
  <div class="container">
    <section class="carousel">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in carousels" :key="index">
          <img :src="item.path" />
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
    </section>
    <section class="article-wrapper">
      <ul class="tabs">
        <li class="active">最新文章</li>
      </ul>
      <article-list :articles="articles" />
      <el-pagination
        style="text-align: center; margin-top: 20px;"
        :page-size="per_page"
        :current-page="page"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleList from '@/components/ArticleList'

export default {
  name: 'Index',
  components: {
    ArticleList,
  },
  fetch({ store, params }) {
    return store.dispatch('article/getArticleList')
  },
  data() {
    return {
      carousels: [
        { path: '/images/1.jpg' },
        { path: '/images/2.jpg' },
        { path: '/images/3.jpg' },
      ],
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
          el: '.swiper-pagination',
        },
        setWrapperSize: true,
        lazy: true,
      },
    }
  },
  computed: {
    ...mapState('article', ['articles', 'total', 'page', 'per_page']),
  },
  methods: {
    handleCurrentChange(val) {
      const params = {
        page: val,
      }
      this.$store.dispatch('article/getArticleList', params)
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
.carousel {
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 20px;
}
.article-wrapper {
  padding: 8px 15px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  .tabs {
    display: flex;
    align-items: center;
    height: 30px;
    border-bottom: 1px solid #e9eaed;
    font-size: 16px;
    li {
      position: relative;
      display: flex;
      align-items: center;
      &.active {
        color: #08c;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -7px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #08c;
      }
    }
  }
}
</style>
