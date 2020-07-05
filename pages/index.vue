<template>
  <div class="container">
    <section class="carousel">
      <client-only>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in carousels" :key="index">
            <img :src="item.path" />
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination"></div>
        </swiper>
      </client-only>
    </section>
    <section class="article-wrapper">
      <ul class="tabs">
        <li class="active">最新文章</li>
      </ul>
      <article v-for="article in articles" :key="article.id" class="article">
        <nuxt-link
          class="article-thumbnail"
          :to="{
            name: 'article-id',
            params: { id: article.id, title: article.title },
          }"
        >
          <img
            :src="article.thumbnail"
            :alt="article.title"
            class="thumbnail"
          />
        </nuxt-link>
        <div class="article-content">
          <h3 class="title">
            <span class="classify">{{ article.category.name }}</span>
            <nuxt-link
              :to="{
                name: 'article-id',
                params: { id: article.id, title: article.title },
              }"
              >{{ article.title }}</nuxt-link
            >
          </h3>
          <div class="summary">{{ article.content }}</div>
          <div class="article-info">
            <div class="article-meta">
              <span>
                <i class="iconfont icon-msnui-time-detail" />
                {{ article.created_time | dateFormat }}
              </span>
              <span>
                <i class="iconfont icon-eye" />
                {{ article.views }}
              </span>
              <span>
                <i class="iconfont icon-pinglun" />
                {{ article.comments }}
              </span>
              <span>
                <i class="iconfont icon-dianzan" />
                {{ article.likes }}
              </span>
            </div>
            <nuxt-link
              class="detail-btn"
              :to="{
                name: 'article-id',
                params: { id: article.id, title: article.title },
              }"
            >
              阅读全文
              <i class="iconfont icon-next" />
            </nuxt-link>
          </div>
        </div>
      </article>
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

export default {
  name: 'Index',
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
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
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
  .article {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #eee;

    &:hover .thumbnail {
      transform: scale(1.075);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      width: 0;
      height: 1px;
      transition: width 0.5s;
    }

    &:hover::after {
      width: 100%;
      background-color: #1890ff;
    }

    .article-thumbnail {
      display: block;
      margin-right: 10px;
      overflow: hidden;
      border-radius: 6px;
      width: 240px;
      height: 160px;

      .thumbnail {
        width: 240px;
        height: 160px;
        transition: 0.4s ease-in-out;
      }
    }

    .article-content {
      position: relative;
      flex: 1;

      .title {
        // font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
        vertical-align: middle;

        .classify {
          vertical-align: middle;
          position: relative;
          margin-right: 10px;
          padding: 3px 5px;
          font-size: 12px;
          color: #fff;
          border-radius: 6px;
          background-color: #1890ff;

          &::after {
            content: '';
            position: absolute;
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            border: 5px solid transparent;
            border-left-color: #1890ff;
          }
        }

        a {
          vertical-align: middle;
        }
      }

      .summary {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        margin: 10px auto;
        height: 90px;
        overflow: hidden;
        color: #555;
        line-height: 24px;
        font-size: 14px;
        word-break: break-word;
        text-overflow: ellipsis;
      }

      .article-info {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        font-size: 12px;

        .article-meta {
          font-size: 12px;
          color: #999;

          span {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
