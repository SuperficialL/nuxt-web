<template>
  <div class="container">
    <section class="carousel">
      <ul>
        <li v-for="carousel in carousels" :key="carousel._id">
          <img :src="carousel.url" />
          <p>{{ carousel.title }}</p>
        </li>
      </ul>
    </section>
    <section class="article-wrapper">
      <article v-for="article in articles" :key="article._id" class="article">
        <nuxt-link
          class="article-thumbnail"
          :to="{
            name: 'detail',
            params: { id: article._id, title: article.title },
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
                name: 'detail',
                params: { id: article._id, title: article.title },
              }"
              >{{ article.title }}</nuxt-link
            >
          </h3>
          <div class="summary">{{ article.content }}</div>
          <div class="article-info">
            <div class="article-meta">
              <span>
                <i class="iconfont icon-msnui-time-detail" />
                {{ article.created_time }}
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
                name: 'detail',
                params: { id: article._id, title: article.title },
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
        @size-change="handleSizeChange"
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
    return store.dispatch('article/getArticleList', {
      page: 1,
      per_page: 8,
    })
  },
  data() {
    return {
      carousels: [],
    }
  },
  computed: {
    ...mapState('article', ['articles', 'total', 'page', 'per_page']),
  },
  methods: {
    handleSizeChange(val) {
      this.query.per_page = val
    },

    handleCurrentChange(val) {
      this.query.page = val
    },
  },
  head() {
    return {
      title: 'sss',
      meta: [
        { name: 'keywords', content: 'ss' },
        { name: 'description', content: 'sss' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
// .wrap {
//   width: 1200px;
//   display: flex;
//   justify-content: space-between;
//   margin: 20px auto;
// }
.article-wrapper {
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;

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
