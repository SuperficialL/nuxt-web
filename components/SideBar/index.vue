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
          最近评论
        </h4>
      </div>
      <div class="sidebar-content">
        <ul class="recent-comment">
          <li v-for="(comment, index) in comments" :key="index" class="item">
            <a href="#" :title="comment.title">
              <img
                class="avatar"
                :src="comment.avatar"
                :alt="comment.username"
                width="50"
                height="50"
              />
            </a>
            <div class="con">
              <a href="#" :title="comment.title">
                <p>{{ comment.content }}</p>
              </a>
              <p class="info">
                {{ comment.username }} 评论于:
                {{ comment.created_time | dateFormat }}
              </p>
            </div>
          </li>
        </ul>
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
        <ul class="sidebar-tags">
          <li v-for="tag in tags" :key="tag._id" class="tag">
            <nuxt-link
              :to="{
                name: 'tag',
                params: { id: tag._id },
                query: { title: tag.title },
              }"
            >
              {{ tag.title }}
            </nuxt-link>
          </li>
        </ul>
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
export default {
  name: 'Sidebar',
  data() {
    return {
      keywords: '',
    }
  },
  computed: {
    ...mapState('tag', ['tags']),
    ...mapState('comment', ['comments']),
    // ...mapState({
    //   sidebar: state => ({
    //     notice: state.info.notice,
    //     newComment: state.info.newComment,
    //     isOpenTextThumbnail: state.info.isOpenTextThumbnail,
    //     isOpenAsideCount: state.info.isOpenAsideCount,
    //     getAllCountTag: state.info.getAllCountTag,
    //     getAllCountArticle: state.info.getAllCountArticle,
    //     getAllCountPage: state.info.getAllCountPage,
    //     getAllCountComment: state.info.getAllCountComment,
    //     getAllCountCat: state.info.getAllCountCat,
    //     lastUpDate: state.info.lastUpDate,
    //     tagCloud: state.info.tagCloud
    //   })
    // })
  },
  methods: {
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

    &:hover .avatar {
      transform: rotate(360deg);
    }

    &:last-child {
      border-bottom: none;
    }

    .avatar {
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
