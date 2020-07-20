<template>
  <div v-if="articles.length" class="article-list">
    <article
      v-for="article in articles"
      :key="article.id"
      class="article"
      :class="{ mobile: isMobile }"
    >
      <nuxt-link
        class="article-thumbnail"
        :to="{
          name: 'article-id',
          params: { id: article.id, title: article.title },
        }"
      >
        <img :src="article.thumbnail" :alt="article.title" class="thumbnail" />
      </nuxt-link>
      <div class="article-content">
        <h3 class="title">
          <span class="classify">{{ article.category.name }}</span>
          <nuxt-link
            :to="{
              name: 'article-id',
              params: { id: article.id, title: article.title },
            }"
          >
            {{ article.title }}
          </nuxt-link>
        </h3>
        <div class="summary">{{ article.summary }}</div>
        <div class="article-info">
          <div class="article-meta">
            <span>
              <i class="iconfont icon-time" />
              {{ article.created_time | dateFormat }}
            </span>
            <span>
              <i class="iconfont icon-eye" />
              {{ article.views }}
            </span>
            <span>
              <i class="iconfont icon-comment" />
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
            <i v-if="!isMobile" class="iconfont icon-next" />
          </nuxt-link>
        </div>
      </div>
    </article>
  </div>
  <div v-else class="article-list" :class="{ mobile: isMobile }">暂无文章</div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isMobile() {
      return this.$store.state.global.isMobile
    },
  },
}
</script>

<style lang="scss" scoped>
.article-list {
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
        margin: 0;
        line-height: 1;
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
          border-radius: 2px;
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
        .detail-btn {
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
    &.mobile {
      display: block;
      position: relative;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      .article-thumbnail {
        display: block;
        width: 100%;
        margin-right: 0;
        overflow: hidden;
        border-radius: 6px;
        .thumbnail {
          width: 100%;
          height: 140px;
          transition: 0.4s ease-in-out;
        }
      }
      .article-content {
        position: relative;
        .title {
          margin: 8px 0;
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
            border-radius: 2px;
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
          display: block;
          font-size: 12px;
          .article-meta {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #999;
          }
          .detail-btn {
            display: block;
            margin-top: 10px;
            padding: 8px 6px;
            text-align: center;
            border-radius: 4px;
            color: #fff;
            background-color: #1890ff;
          }
        }
      }
    }
  }
}
</style>
