<template>
  <aside ref="aside" class="sidebar-wrapper">
    <div class="aside-search">
      <div class="search-box">
        <input
          required
          id="keyword"
          name="search"
          type="search"
          class="search-input"
          v-model.trim="keyword"
          size="mini"
          placeholder="请输入关键字"
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">
          <i class="iconfont icon-search"></i>
        </button>
      </div>
    </div>

    <div class="aside-article">
      <h4 class="title">
        <i class="iconfont icon-hot"></i>
        热门文章
      </h4>
      <ul v-if="hotList.length" class="aside-article-list">
        <li v-for="article in hotList" :key="article.id" class="item">
          <span class="index"></span>
          <nuxt-link
            :to="{
              name: 'article-id',
              params: { id: article.id, title: article.title },
            }"
            :title="`${article.title} - 「 ${article.comments} 条看法 | ${article.likes} 人觉得很牛逼 」`"
          >
            {{ article.title }}
          </nuxt-link>
        </li>
      </ul>
      <empty v-else></empty>
    </div>

    <!-- <div class="sidebar">
      <div class="sidebar-header">
        <h4 class="sidebar-title">
          最近评论
        </h4>
      </div>
      <div class="sidebar-content">
        <ul v-if="hotComments.length" class="recent-comment">
          <li v-for="(comment, index) in hotComments" :key="index" class="item">
            <div class="avatar">
              <img
                :src="getGravatarUrlByEmail(comment.author.email)"
                :alt="comment.author.name"
              />
            </div>
            <div class="con">
              <nuxt-link
                :to="{
                  name: 'article-id',
                  params: { id: comment.article_id },
                }"
              >
                {{ comment.content }}
              </nuxt-link>
              <p class="info">
                {{ comment.author.name }} 评论于:
                {{ comment.created_time | dateFormat }}
              </p>
            </div>
          </li>
        </ul>
        <div v-else>
          暂无评论
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-header">
        <h4 class="sidebar-title">
          标签云
        </h4>
        <nuxt-link to="/">
          更多
        </nuxt-link>
      </div>
      <div class="sidebar-content">
        <ul v-if="tags.length" class="sidebar-tags">
          <li v-for="tag in tags" :key="tag._id" class="tag">
            <nuxt-link
              :to="{
                name: 'tag-tag_slug',
                params: { tag_slug: tag.slug, title: tag.name },
              }"
            >
              {{ tag.name }}
            </nuxt-link>
          </li>
        </ul>
        <div v-else>
          暂无标签
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-header">
        <h4 class="sidebar-title">
          站点信息
        </h4>
      </div>
      <div class="sidebar-content">
        <ul class="site">
          <li>
            分类:<span> {{ statistic.categories }}</span
            >个
          </li>
          <li>
            标签:<span> {{ statistic.tags }}</span
            >个
          </li>
          <li>
            文章:<span> {{ statistic.articles }}</span
            >篇
          </li>
          <li>
            评论:<span> {{ statistic.comments }}</span
            >条
          </li>
        </ul>
      </div>
    </div> -->
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import { getGravatarByEmail } from '@/utils'
import empty from '@/components/archive/empty'
export default {
  name: 'Sidebar',
  data() {
    return {
      keyword: '',
    }
  },
  component: {
    empty,
  },
  computed: {
    ...mapState('article', ['hotList']),
    ...mapState('comment', ['hotComments']),
    ...mapState('global', ['statistic']),
    tags() {
      return this.$store.state.tag.data
    },
  },

  methods: {
    // 处理关键词查询
    handleSearch() {
      const keyword = this.keyword
      const paramsKeyword = this.$route.params.keyword
      const isSearchRoute = this.$route.name === 'search-keyword'
      if (keyword && (isSearchRoute ? paramsKeyword !== keyword : true)) {
        this.$router.push({ name: 'search-keyword', params: { keyword } })
      }
    },
    getGravatarUrlByEmail(email) {
      return getGravatarByEmail(email)
    },
    // 查询
    search() {},
    handleStickyStateChange(event) {
      // workaround: when (main container height >= aside height) & isSticky -> render sticky ad
      const asideElementHeight = this.$refs.aside.clientHeight
      const mainContentElementHeight = document.getElementById('content')
        .children[0].clientHeight
      const isFixed = mainContentElementHeight >= asideElementHeight
      if (isFixed) {
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  position: sticky;
  top: 0;
}
.aside-search,
.aside-article,
.aside-calendar,
.aside-mammon,
.aside-tag {
  margin-bottom: $lg-gap;
  @include module-blur-bg();
}
.aside-search {
  padding: $sm-gap;
  width: 100%;
  height: 3em;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .search-input,
  .search-btn,
  .sitemap-btn {
    background-color: $module-hover-bg;

    &:hover {
      background-color: $module-hover-bg-darken-20;
    }
  }

  > .search-box {
    display: flex;
    flex-grow: 1;

    > .search-input {
      margin-right: 0;
      flex-grow: 1;

      &::-webkit-calendar-picker-indicator {
        display: none;
      }
    }

    > .search-btn {
      width: 2em;
      background-color: $module-hover-bg-darken-20;

      &:hover {
        background-color: $module-hover-bg-darken-40;
      }
    }
  }

  > .sitemap-btn {
    display: inline-block;
    text-align: center;
    margin-left: $sm-gap;
    width: 3em;

    > .iconfont {
      font-size: $font-size-h3;
    }
  }
}

.aside-article {
  .title {
    height: 3em;
    line-height: 3em;
    margin: 0;
    padding: 0 1rem;
    border-bottom: 1px dashed var(--body-bg);
    text-transform: uppercase;
    .iconfont {
      margin-right: $sm-gap;
    }
  }
  .aside-article-list {
    list-style: none;
    padding: 0.618rem 0;
    margin-bottom: 0;
    counter-reset: hot-article-list;
    .item {
      display: block;
      height: 20px;
      line-height: 20px;
      padding: 0 2em;
      margin-bottom: 0.618rem;
      color: var(--text-dark);
      @include text-overflow();
      &:nth-child(1) {
        .index {
          color: $text-reversal;
          background-color: $primary-opacity-5;
        }
      }
      &:nth-child(2) {
        .index {
          color: $text-reversal;
          background-color: rgba($accent, 0.6);
        }
      }

      &:nth-child(3) {
        .index {
          color: $text-reversal;
          background-color: rgba($red, 0.6);
        }
      }
      &:last-child {
        margin: 0;
      }

      .index {
        color: $text-secondary;
        counter-increment: hot-article-list;
        background-color: $module-hover-bg;
        width: 1.5em;
        height: 1.5em;
        line-height: 1.5em;
        display: inline-block;
        text-align: center;
        margin-right: $sm-gap;
        font-size: $gap;

        &::before {
          content: counter(hot-article-list);
        }
      }
      .title {
        font-size: $font-size-h6;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
// .sidebar-content {
//   margin-top: 10px;
// }
// .sidebar-tags {
//   display: flex;
//   flex-wrap: wrap;
//   .tag {
//     margin: 3px 5px;
//     padding: 3px;
//     background-color: #fff;
//     border: 1px solid #ccc;
//     border-radius: 3px;
//     transition: color 0.4s;
//     cursor: pointer;
//     a:hover {
//       color: #1890ff;
//     }
//   }
// }
// }
// .search {
//   cursor: pointer;
// }

// .hot-list {
//   font-family: Georgia, serif;
//   color: #d9534f;
//   font-size: 16px;
//   li a {
//     position: relative;
//     display: block;
//     padding: 6px 20px 6px 10px;
//     line-height: 22px;
//     font-size: 12px;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     overflow: hidden;
//     font-family: Helvetica, Arial, sans-serif;
//     color: #747f8c;
//   }
// }

/* 侧边栏最近文章 */
// .recent-list {
//   .item {
//     border-bottom: 1px dotted #ccc;
//     &:last-child {
//       margin-bottom: 0;
//     }
//     a {
//       display: flex;
//       align-items: center;
//       padding: 10px 0;
//       transition: all 1s;
//       &:hover {
//         margin-left: 5px;
//       }
//     }
//   }
// }

// .recent-comment {
//   position: relative;
//   width: 100%;
//   overflow: hidden;
//   .item {
//     display: flex;
//     align-items: center;
//     padding: 10px 0;
//     border-bottom: 1px dotted #ccc;
//     &:last-child {
//       border-bottom: none;
//     }
//     .avatar {
//       width: 48px;
//       height: 48px;
//       border-radius: 50%;
//       margin-right: 10px;
//       transition: 0.6s;
//     }
//     .con {
//       flex: 1;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//       a {
//         color: #333;
//       }
//       .info {
//         font-size: 12px;
//         color: #999;
//       }
//     }
//   }
// }

/* 侧边栏站点统计样式 */
// .site {
//   display: flex;
//   flex-wrap: wrap;
//   > li {
//     width: 50%;
//   }
// }
</style>
