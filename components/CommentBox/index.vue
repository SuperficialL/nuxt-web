<template>
  <section class="comment-wrap">
    <div class="comment-title">
      <div class="count">
        <strong>{{ comments.pagination.total || 0 }}</strong>
        <span>条看法</span>
      </div>
      <div class="likes" :class="{ liked: isLikeArticle }" @click="likeArticle">
        <i class="iconfont icon-like" />
        <strong>{{ likes }}</strong>
        <span>人觉得很牛逼</span>
      </div>
    </div>
    <div id="comment-box" class="comment-form">
      <div class="comment-user">
        <div class="name">
          <input v-model="user.name" type="text" placeholder="昵称*" />
        </div>
        <div class="email">
          <input
            v-model="user.email"
            type="email"
            placeholder="邮箱*"
            @blur="updateUserGravatar"
          />
        </div>
        <div class="site">
          <input v-model="user.site" type="url" placeholder="站点" />
        </div>
      </div>
      <div class="comment-editor">
        <div class="user">
          <div class="avatar">
            <img :src="humanizeGravatarUrl(user.gravatar)" alt="匿名用户" />
          </div>
        </div>
        <div class="editor">
          <div class="markdown">
            <div
              ref="markdownInput"
              contenteditable="true"
              class="markdown-input"
              placeholder="来点见解！"
            ></div>
          </div>
        </div>
      </div>
      <div class="comment-btn">
        <button type="submit" class="submit-btn" @click="submitComment">
          <i v-show="fetching" class="iconfont icon-loading"></i>
          提交评论
        </button>
      </div>
    </div>
    <ul class="comment-list">
      <li
        v-for="comment in comments.data"
        :id="`comment-item-${comment.id}`"
        :key="comment.id"
        class="comment-item"
      >
        <div class="comment-avatar">
          <img
            :src="
              humanizeGravatarUrl(getGravatarUrlByEmail(comment.author.email))
            "
            :alt="comment.author.name"
          />
        </div>
        <div class="comment-body">
          <div class="comment-header">
            <a
              :href="comment.author.site"
              class="username"
              @click="clickUser($event, comment.author)"
            >
              {{ comment.author.name }}
            </a>
            <comment-ua v-if="comment.agent" :ua="comment.agent" />
            <span v-if="comment.ip_location" class="location">
              <span>{{ comment.ip_location.country }}</span>
              <span
                v-if="comment.ip_location.country && comment.ip_location.city"
                >&nbsp;-&nbsp;</span
              >
              <span>{{ comment.ip_location.city }}</span>
            </span>
            <span class="floor">#{{ comment.id }}</span>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-footer">
            <span class="created-time">
              {{ comment.created_time | dateFormat }}
            </span>
            <a class="reply" @click.stop.prevent="replyComment(comment)">
              <i class="iconfont icon-reply"></i>
              <span> 回复 </span>
            </a>
            <span
              class="like"
              :class="{
                liked: getCommentLiked(comment.id),
              }"
              @click="likeComment(comment)"
            >
              <i class="iconfont icon-dianzan" /> 赞({{ comment.likes }})
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import CommentUa from './components/ua'
import { getJSONStorageReader } from '@/services/localStorage'
import { getGravatarByEmail, scrollTo } from '@/utils'
const localUser = getJSONStorageReader('user')
const localHistoryLikes = getJSONStorageReader('user_like_history')

const emailRegex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
// eslint-disable-next-line no-useless-escape
const urlRegex = /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/

export default {
  name: 'Comment',
  components: {
    CommentUa,
  },
  props: {
    articleId: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // 父级评论
      parent: null,
      user: {
        name: '',
        email: '',
        site: '',
        gravatar: null,
      },
      content: '',
      historyLikes: {
        pages: [],
        comments: [],
      },
    }
  },
  computed: {
    ...mapState('comment', ['comments', 'fetching']),
    isLikeArticle() {
      return this.historyLikes.pages.includes(this.articleId)
    },
  },
  mounted() {
    const isBrowser = process.browser
    if (isBrowser) {
      this.initUser()
    }
  },
  destroyed() {
    this.$store.commit('comment/clearListData')
  },
  methods: {
    // 初始化本地用户点赞历史
    initUser() {
      const user = localUser.get()
      const historyLikes = localHistoryLikes.get()
      if (user) {
        this.user = user
        // this.upadteUserGravatar()
        // this.userCacheMode = true
      }
      if (historyLikes) {
        this.historyLikes = historyLikes
      }
    },

    // 点击用户
    clickUser(event, user) {
      if (!user.site) event.preventDefault()
    },

    // 清空评论内容
    clearCommentContent() {
      this.content = ''
    },

    humanizeGravatarUrl(gravatar) {
      return gravatar || require('@/static/images/default.jpg')
    },

    getGravatarUrlByEmail(email) {
      return emailRegex.test(email) ? getGravatarByEmail(email) : null
    },

    // 更新当前用户头像
    updateUserGravatar() {
      this.user.gravatar = this.getGravatarUrlByEmail(this.user.email)
    },

    // 提交评论
    submitComment() {
      if (!this.user.name) {
        return this.$message.warning(`名字?`)
      }
      if (!this.user.email) {
        return this.$message.warning(`邮箱?`)
      }
      if (!emailRegex.test(this.user.email)) {
        return this.$message.warning(`邮箱格式错误!`)
      }
      if (this.user.site && !urlRegex.test(this.user.site)) {
        return this.$message.warning(`站点地址错误!`)
      }
      if (!this.content || !this.content.replace(/\s/g, '')) {
        return this.$message.warning(`内容？`)
      }
      if (!this.user.site) {
        Reflect.deleteProperty(this.user, 'site')
      }
      this.$store
        .dispatch('comment/fetchPostComment', {
          parent: this.parent,
          article_id: this.articleId,
          author: this.user,
          content: this.content,
          agent: navigator.userAgent,
        })
        .then((res) => {
          this.clearCommentContent()
          localUser.set(this.user)
        })
        .catch((err) => {
          window.console.log(err, '评论错误')
          this.$message({
            type: 'error',
            message: '评论发布失败~',
            showClose: true,
          })
        })
    },

    // 回复评论
    replyComment(comment) {
      this.parent = comment.id
      this.toSomeAnchorById('comment-box')
    },

    // 跳转到某条指定的id位置
    toSomeAnchorById(id) {
      const targetDom = document.getElementById(id)
      if (targetDom) {
        const isToEditor = id === 'comment-box'
        scrollTo(targetDom, 200, { offset: isToEditor ? -80 : -300 })
        // 如果是进入编辑模式，则需要激活光标
        if (isToEditor && this.$refs.markdownInput) {
          this.$refs.markdownInput.focus()
        }
      }
    },

    // 点赞文章
    likeArticle() {
      if (this.isLikeArticle) {
        return false
      }
      this.$store
        .dispatch('article/fetchLikeArticle', {
          id: this.articleId,
          type: 'article',
        })
        .then((res) => {
          this.historyLikes.pages.push(this.articleId)
          localHistoryLikes.set(this.historyLikes)
          window.console.log('喜欢成功~', res)
        })
        .catch((err) => {
          window.console.log('喜欢失败', err)
        })
    },

    // 点赞评论
    likeComment(comment) {
      if (this.getCommentLiked(comment.id)) {
        return false
      }
      this.$store
        .dispatch('comment/fetchLikeComment', {
          id: comment.id,
          type: 'comment',
        })
        .then((res) => {
          this.historyLikes.comments.push(comment.id)
          localHistoryLikes.set(this.historyLikes)
          window.console.log('喜欢成功~', res)
        })
        .catch((err) => {
          window.console.log('喜欢失败', err)
        })
    },

    // 获取某条评论是否被点赞
    getCommentLiked(commentId) {
      return this.historyLikes.comments.includes(commentId)
    },
  },
}
</script>

<style lang="scss">
.comment-wrap {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
  .comment-title {
    display: flex;
    padding-bottom: 1rem;
    align-items: center;
    // justify-content: space-between;
    border-bottom: 1px solid hsla(0, 0%, 77.3%, 0.5);
    > .count {
      padding: 4px 10px;
      margin-right: 10px;
      background-color: hsla(0, 0%, 77.3%, 0.5);
    }
    > .likes {
      padding: 3px 10px;
      cursor: pointer;
      transition: all 0.4s;
      background-color: hsla(0, 0%, 77.3%, 0.5);
      &:hover {
        background-color: hsla(0, 0%, 77.3%, 0.9);
      }
      .iconfont {
        font-size: 14px;
        color: #8a8a8a;
      }
      &.liked .iconfont {
        color: #ff5722;
      }
    }
  }
  .comment-form {
    .comment-user {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .name,
      .email,
      .site {
        position: relative;
        width: 33%;
        padding: 6px 0;
        input {
          width: 100%;
          height: 100%;
          padding: 5px;
          background-color: #f0f2f7;
          border-radius: 3px;
        }
      }
    }
    .comment-editor {
      display: flex;
      width: 100%;
      .user {
        margin-right: 10px;
        .avatar {
          display: block;
          width: 48px;
          height: 48px;
        }
      }
      .editor {
        flex-grow: 1;
        overflow: hidden;
        .markdown {
          position: relative;
          .markdown-input {
            min-height: 100px;
            overflow: auto;
            outline: none;
            padding: 5px;
            cursor: auto;
            font-size: 13.3px;
            line-height: 1.8;
            transition: background-color 0.1s;
            background-color: hsla(0, 0%, 67.5%, 0.5);
            &:before {
              content: attr(placeholder);
              color: rgba(0, 0, 0, 0.38);
            }
          }
        }
      }
    }
    .comment-btn {
      margin-top: 10px;
      text-align: center;
      .submit-btn {
        width: 170px;
        padding: 8px 30px;
        cursor: pointer;
        background: #1890ff;
        border-radius: 12px;
        border: none;
        outline: none;
        vertical-align: middle;
        .icon-loading {
          display: inline-block;
          font-size: 15px;
          color: #fff;
          animation: rotating 2s linear infinite;
        }
      }
    }
  }
  .comment-list {
    background-color: #fff;
    .comment-item {
      position: relative;
      padding-left: 24px;
      margin-top: 20px;
      &:hover .comment-body {
        background-color: hsla(0, 0%, 57.3%, 0.5);
      }
      &:hover img {
        transform: rotate(360deg);
      }
      .comment-avatar {
        position: absolute;
        left: 0;
        top: 25%;
        width: 42px;
        height: 42px;
        border: 3px solid #fff;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          transition: transform 0.5s;
        }
      }
      .comment-body {
        padding: 8px 8px 8px 36px;
        border-radius: 6px;
        background-color: rgba(197, 197, 197, 0.5);
        transition: background-color 0.5s;
        .comment-header {
          .username {
            margin-right: 10px;
            &:hover {
              color: #1890ff;
            }
          }
          span {
            .iconfont {
              font-size: 11px;
            }
            .browser {
              cursor: default;
              margin-right: 10px;
              color: rgba(0, 0, 0, 0.38);
            }
            .os {
              margin-right: 10px;
              color: rgba(0, 0, 0, 0.38);
              cursor: default;
            }
          }
          .floor {
            float: right;
            line-height: 2;
            color: rgba(0, 0, 0, 0.26);
            font-size: 12.432px;
            font-weight: 900;
          }
        }
        .comment-content {
          margin: 10px 0;
          line-height: 2;
        }
        .comment-footer {
          span {
            color: rgba(0, 0, 0, 0.38);
            margin-right: 10px;
          }
          .reply {
            cursor: pointer;
            transition: color 0.4s;
            &:hover {
              color: rgba(0, 0, 0, 0.7);
            }
          }
          .like {
            cursor: pointer;
            .iconfont {
              color: #8a8a8a;
            }
            &.liked .iconfont {
              color: #ff5722;
            }
          }
        }
      }
    }
  }
}
</style>
