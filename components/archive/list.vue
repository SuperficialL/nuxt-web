<template>
  <div class="articles" :class="{ mobile: isMobile }">
    <!-- 非首页列表头 -->
    <div class="article-list-header">
      <list-header />
    </div>
    <div v-if="article" class="article-list">
      <transition name="module" mode="out-in">
        <transition-group
          key="list"
          name="fade"
          tag="div"
          v-if="article.data.data && article.data.data.length"
        >
          <article
            v-for="articleItem in article.data.data"
            :key="articleItem.id"
            class="article"
            :class="{ mobile: isMobile }"
          >
            <nuxt-link
              class="article-thumbnail"
              :to="{
                name: 'article-id',
                params: { id: articleItem.id, title: articleItem.title },
              }"
            >
              <img
                :src="articleItem.thumbnail"
                :alt="articleItem.title"
                class="thumbnail"
              />
            </nuxt-link>
            <div class="article-content">
              <h3 class="title">
                <span class="classify">{{ articleItem.category.name }}</span>
                <nuxt-link
                  :to="{
                    name: 'article-id',
                    params: { id: articleItem.id, title: articleItem.title },
                  }"
                >
                  {{ articleItem.title }}
                </nuxt-link>
              </h3>
              <div class="summary">{{ articleItem.description }}</div>
              <div class="article-info">
                <div class="article-meta">
                  <span>
                    <i class="iconfont icon-time" />
                    {{ articleItem.created_time | dateFormat }}
                  </span>
                  <span>
                    <i class="iconfont icon-eye" />
                    {{ articleItem.views }}
                  </span>
                  <span>
                    <i class="iconfont icon-comment" />
                    {{ articleItem.comments }}
                  </span>
                  <span>
                    <i class="iconfont icon-dianzan" />
                    {{ articleItem.likes }}
                  </span>
                </div>
                <nuxt-link
                  class="detail-btn"
                  :to="{
                    name: 'article-id',
                    params: { id: articleItem.id, title: articleItem.title },
                  }"
                >
                  阅读全文
                  <i v-if="!isMobile" class="iconfont icon-next" />
                </nuxt-link>
              </div>
            </div>
          </article>
        </transition-group>

        <empty key="empty" v-else></empty>
      </transition>
    </div>
    <!-- 加载更多 -->
    <div class="article-load">
      <button
        class="btn-loadmore"
        :disabled="article.fetching || !isCanLoadMore"
        @click="$emit('loadmore')"
      >
        <span v-if="!article.fetching && isCanLoadMore">山河入梦</span>
        <span v-else-if="article.fetching && isCanLoadMore">人面桃花</span>
        <span v-else-if="!isCanLoadMore">
          江南才尽
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import ListHeader from './list-header'
import empty from './empty'
export default {
  name: 'ArticleList',
  components: {
    ListHeader,
    empty,
  },
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isMobile() {
      return this.$store.state.global.isMobile
    },
    isCanLoadMore() {
      const { page, total_page } = this.article.data.pagination
      const hasArticles = this.article.data.pagination
      return hasArticles ? page < total_page : false
    },
  },
}
</script>

<style lang="scss" scoped>
.articles {
  padding: 8px 15px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  .article-list-header {
    padding-bottom: 15px;
    border-bottom: 1px solid #e9eaed;
  }
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
          @include text-overflow();
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
          text-indent: 2em;
          margin: 10px auto;
          height: 90px;
          overflow: hidden;
          color: #555;
          line-height: 23px;
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
        .article-thumbnail {
          width: 100%;
          margin-right: 0;
          .thumbnail {
            width: 100%;
          }
        }
        .article-content {
          position: relative;
          .title {
            margin: 8px 0;
            a {
              vertical-align: middle;
            }
          }
          .summary {
            font-size: 13px;
          }
          .article-info {
            display: block;
            .article-meta {
              display: flex;
              justify-content: space-between;
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
  .article-load {
    margin-top: 20px;
    text-align: center;
    outline: none;
  }
}
</style>
