<template>
  <aside class="sidebar-wrapper">
    <div class="sidebar">
      <div class="search-wrapper">
        <el-input
          v-model="keywords"
          size="mini"
          placeholder="请输入关键字"
          @keyup.enter.native="search"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search search"
            @click="search"
          />
        </el-input>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-header">
        <h4 class="sidebar-title">
          热门文章
        </h4>
      </div>
      <div class="sidebar-content">
        <ul v-if="hotArticles.length" class="recent-comment">
          <li v-for="(article, index) in hotArticles" :key="index" class="item">
            <nuxt-link
              :to="{
                name: 'article-id',
                params: { id: article.id, title: article.title },
              }"
            >
              {{ article.title }}
            </nuxt-link>
          </li>
        </ul>
        <div v-else>
          暂无文章
        </div>
      </div>
    </div>

    <div class="sidebar">
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
                name: 'tag-slug',
                params: { slug: tag.slug, title: tag.title },
              }"
            >
              {{ tag.title }}
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
          <li>分类:1个</li>
          <li>标签:1个</li>
          <li>文章:1篇</li>
          <li>评论:1条</li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import { getGravatarByEmail } from '@/utils'
export default {
  name: 'Sidebar',
  data() {
    return {
      keywords: '',
    }
  },
  computed: {
    ...mapState('article', ['hotArticles']),
    ...mapState('comment', ['hotComments']),
    ...mapState('tag', ['tags']),
  },
  methods: {
    getGravatarUrlByEmail(email) {
      return getGravatarByEmail(email)
    },
    // 查询
    search() {
      this.$message.success('查询功能博主正在开发中!')
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 6px;
  background-color: #fff;
  &:last-child {
    margin-bottom: 0;
  }
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e9eaed;
    .sidebar-title {
      position: relative;
      padding: 5px 0;
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #1890ff;
      }
    }
  }
  .sidebar-content {
    margin-top: 10px;
  }
  .sidebar-tags {
    display: flex;
    flex-wrap: wrap;
    .tag {
      margin: 0 10px 10px 0;
      padding: 3px 8px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 3px;
      transition: color 0.4s;
      cursor: pointer;
      a:hover {
        color: #1890ff;
      }
    }
  }
}
.search {
  cursor: pointer;
}

.hot-list {
  font-family: Georgia, serif;
  color: #d9534f;
  font-size: 16px;
  li a {
    position: relative;
    display: block;
    padding: 6px 20px 6px 10px;
    line-height: 22px;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: Helvetica, Arial, sans-serif;
    color: #747f8c;
  }
}

/* 侧边栏最近文章 */
.recent-list {
  .item {
    border-bottom: 1px dotted #ccc;
    &:last-child {
      margin-bottom: 0;
    }
    a {
      display: flex;
      align-items: center;
      padding: 10px 0;
      transition: all 1s;
      &:hover {
        margin-left: 5px;
      }
    }
  }
}

.recent-comment {
  position: relative;
  width: 100%;
  overflow: hidden;
  .item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px dotted #ccc;
    &:last-child {
      border-bottom: none;
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 10px;
      transition: 0.6s;
    }
    .con {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      a {
        color: #333;
      }
      .info {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

/* 侧边栏站点统计样式 */
.site {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 50%;
    letter-spacing: 3px;
  }
}
</style>
