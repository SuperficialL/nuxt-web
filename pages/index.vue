<template>
  <div class="index-page">
    <section class="carousel" :class="{ mobile: isMobile }">
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
      <article-list :articles="articles.data" />
      <el-pagination
        style="text-align: center; margin-top: 20px;"
        :page-size.sync="pagination.per_page"
        :current-page.sync="pagination.page"
        layout="prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleCurrentChange"
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
    return store.dispatch('article/fetchList')
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
    ...mapState('article', ['articles', 'pagination']),
    isMobile() {
      return this.$store.state.global.isMobile
    },
  },
  methods: {
    handleCurrentChange(val) {
      const params = {
        page: val,
      }
      this.$store.dispatch('article/fetchList', params)
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
<style lang="scss">
.carousel {
  .swiper-pagination {
    .swiper-pagination-bullet {
      &.swiper-pagination-bullet-active {
        width: 2rem;
        border-radius: 10px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
$pc-carrousel-height: 309px;
$mobile-carrousel-height: 100vw * 0.36;

.index-page {
  .carousel {
    position: relative;
    height: $pc-carrousel-height;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 20px;
    &.mobile {
      overflow: hidden;
      margin: 0 5px 20px;
      height: $mobile-carrousel-height;
    }
    img {
      width: 100%;
      height: auto;
      overflow: hidden;
    }
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
}
</style>
