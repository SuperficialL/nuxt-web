<template>
  <section class="comment-wrap" :class="{ mobile: isMobile }">
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
      <!-- 用户设置部分 -->
      <transition name="module" mode="out-in">
        <div
          v-if="!userCacheMode || userCacheEditing"
          key="edit"
          class="comment-user"
        >
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
          <div v-if="userCacheEditing" class="save">
            <button type="submit" @click="updateUserCache($event)">
              <i class="iconfont icon-confirm"></i>
            </button>
          </div>
        </div>
        <div
          v-else-if="userCacheMode && !userCacheEditing"
          key="user"
          class="comment-user"
        >
          <div class="edit">
            <strong class="name">{{ user.name }}</strong>
            <a href class="setting" @click.stop.prevent>
              <i class="iconfont icon-xitong1"></i>
              <span class="account-setting">设置账号信息</span>
              <ul class="user-tool">
                <li @click.stop.prevent="userCacheEditing = true">编辑信息</li>
                <li @click.stop.prevent="claerUserCache">清空信息</li>
              </ul>
            </a>
          </div>
        </div>
      </transition>

      <!-- 编辑器 -->
      <div class="comment-editor">
        <div v-if="!isMobile" class="user">
          <div class="avatar">
            <img :src="humanizeGravatarUrl(user.gravatar)" alt="匿名用户" />
          </div>
        </div>
        <div class="editor">
          <transition name="module">
            <div v-if="!!parent" key="reply" class="will-reply">
              <div class="reply-user">
                <span>
                  <span>回复</span>
                  <a
                    href
                    @click.stop.prevent="
                      toSomeAnchorById(`comment-item-${replyCommentSlef.id}`)
                    "
                  >
                    <strong>
                      #{{ replyCommentSlef.id }} @{{
                        replyCommentSlef.author.name
                      }}：
                    </strong>
                  </a>
                </span>
                <a
                  href
                  class="iconfont icon-close"
                  @click.stop.prevent="cancelCommentReply"
                ></a>
              </div>
              <div
                class="reply-preview"
                v-html="marked(replyCommentSlef.content)"
              ></div>
            </div>
          </transition>
          <div class="markdown">
            <div
              ref="markdownInput"
              contenteditable="true"
              class="markdown-input"
              placeholder="来点见解！"
              @keyup="commentContentChange($event)"
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

    <!-- 评论列表 -->
    <ul class="comment-list">
      <li
        v-for="comment in comments.data"
        :id="`comment-item-${comment.id}`"
        :key="comment.id"
        class="comment-item"
      >
        <div v-if="!isMobile" class="comment-avatar">
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
            <span v-if="comment.ip_location && !isMobile" class="location">
              <span>{{ comment.ip_location.country }}</span>
              <span
                v-if="comment.ip_location.country && comment.ip_location.city"
                >&nbsp;-&nbsp;</span
              >
              <span>{{ comment.ip_location.city }}</span>
            </span>
            <span class="floor">#{{ comment.id }}</span>
          </div>
          <div class="comment-content">
            <p v-if="!!comment.parent" class="reply">
              <span>回复</span>
              <a
                href
                @click.stop.prevent="
                  toSomeAnchorById(`comment-item-${comment.parent}`)
                "
              >
                <span>#{{ comment.parent }}&nbsp;</span>
                <strong v-if="fondReplyParent(comment.parent)"
                  >@{{ fondReplyParent(comment.parent) }}</strong
                >
              </a>
              <span>：</span>
            </p>
            <div v-html="marked(comment.content)"></div>
          </div>
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
import { getGravatarByEmail, scrollTo } from '@/utils'
import { getJSONStorageReader } from '@/services/localStorage'
import CommentUa from '@/components/comment/components/ua'
import marked from '~/plugins/marked'
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
      userCacheMode: false,
      userCacheEditing: false,
      // 父级评论
      parent: 0,
      user: {
        name: '',
        email: '',
        site: '',
        gravatar: null,
      },
      comemntContentHtml: '',
      comemntContentText: '',
      historyLikes: {
        pages: [],
        comments: [],
      },
    }
  },
  computed: {
    ...mapState({
      comments: (state) => state.comment.comments,
      fetching: (state) => state.comment.fetching,
      isMobile: (state) => state.global.isMobile,
    }),
    isLikeArticle() {
      return this.historyLikes.pages.includes(this.articleId)
    },
    replyCommentSlef() {
      return this.comments.data.find((comment) =>
        Object.is(comment.id, this.parent)
      )
    },
  },
  mounted() {
    const isBrowser = process.browser
    if (isBrowser) this.initUser()
  },
  // destroyed() {
  //   this.$store.commit('comment/clearListData')
  // },
  // deactivated() {
  //   this.$store.commit('comment/clearListData')
  // },
  methods: {
    // 初始化本地用户点赞历史
    initUser() {
      const user = localUser.get()
      const historyLikes = localHistoryLikes.get()
      if (user) {
        this.user = user
        // this.upadteUserGravatar()
        this.userCacheMode = true
      }
      if (historyLikes) {
        this.historyLikes = historyLikes
      }
    },

    // 获取输入框内容
    getInputText() {
      return this.$refs.markdownInput.textContent
    },

    // 设置输入框内容
    setInputText(content) {
      this.$refs.markdownInput.textContent = content
    },

    // 点击用户
    clickUser(event, user) {
      if (!user.site) event.preventDefault()
    },

    // 更新用户数据
    updateUserCache(event) {
      event.preventDefault()
      if (!this.user.name) {
        return alert('名字?')
      }
      if (!this.user.email) {
        return alert('邮箱?')
      }
      if (!emailRegex.test(this.user.email)) {
        return alert('邮箱格式错误~')
      }
      if (this.user.site && !urlRegex.test(this.user.site)) {
        return alert('网站格式错误~')
      }
      localUser.set(this.user)
      this.userCacheEditing = false
    },

    // 清空用户数据
    claerUserCache() {
      this.userCacheMode = false
      this.userCacheEditing = false
      localUser.remove()
      Object.keys(this.user).forEach((key) => {
        this.user[key] = ''
      })
    },

    // 清空评论内容
    clearCommentContent() {
      this.comemntContentHtml = ''
      this.$refs.markdownInput.innerHTML = this.comemntContentHtml
      this.commentContentChange()
    },

    // 编辑器相关
    commentContentChange() {
      const html = this.$refs.markdownInput.innerHTML
      const text = this.$refs.markdownInput.textContent
      if (!Object.is(html, this.comemntContentHtml)) {
        this.comemntContentHtml = html
      }
      if (!Object.is(text, this.comemntContentText)) {
        this.comemntContentText = text
      }
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
        return alert('名字？')
      }
      if (!this.user.email) {
        return alert('邮箱？')
      }
      if (!emailRegex.test(this.user.email)) {
        return alert('邮箱格式错误？')
      }
      if (this.user.site && !urlRegex.test(this.user.site)) {
        return alert('站点地址错误？')
      }
      if (
        !this.comemntContentText ||
        !this.comemntContentText.replace(/\s/g, '')
      ) {
        return alert('内容？')
      }
      if (!this.user.site) {
        Reflect.deleteProperty(this.user, 'site')
      }
      this.$store
        .dispatch('comment/fetchPostComment', {
          parent: this.parent,
          article_id: this.articleId,
          author: this.user,
          content: this.comemntContentText,
          agent: navigator.userAgent,
        })
        .then((res) => {
          this.clearCommentContent()
          this.userCacheMode = true
          localUser.set(this.user)
        })
        .catch((err) => {
          console.log(err, '评论错误')
          alert('评论发布失败~')
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
        const isToEditor = Object.is(id, 'comment-box')
        scrollTo(targetDom, 200, { offset: isToEditor ? -60 : -20 })
        // 如果是进入编辑模式，则需要激活光标
        if (isToEditor) {
          const p = this.$refs.markdownInput
          const selObj = window.getSelection()
          const r = document.createRange()
          r.setStart(p, p.childElementCount)
          r.setEnd(p, p.childElementCount)
          selObj.removeAllRanges()
          selObj.addRange(r)
        }
      }
    },

    // 取消回复
    cancelCommentReply() {
      this.parent = 0
    },

    // 找到回复来源
    fondReplyParent(commentId) {
      const parent = this.comments.data.find((comment) =>
        Object.is(comment.id, commentId)
      )
      return parent ? parent.author.name : null
    },

    // markdown解析服务
    marked(content) {
      return marked(content, null, false)
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
  &.mobile {
    > .comment-form {
      .comment-user {
        flex-direction: column;
        height: auto;
        > .name,
        > .email,
        > .site,
        > .save {
          width: 80%;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 8px;
        }
        > .save {
          width: 30%;
          margin-bottom: 0;
        }
      }
    }
    > .comment-list {
      > .comment-item {
        padding: 0;
        > .comment-body {
          padding-left: 8px;
        }
      }
    }
  }
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
      width: 100%;
      height: 2em;
      line-height: 2em;
      display: flex;
      margin-bottom: 1rem;
      padding-left: 5.2rem;
      .name,
      .email,
      .site {
        flex-grow: 1;
        margin-right: 10px;
        input {
          width: 100%;
          height: 100%;
          background-color: #f0f2f7;
          border-radius: 3px;
        }
      }
      .site {
        margin-right: 0;
      }
      .save {
        width: 40px;
        margin-left: 10px;
        text-align: center;
        button {
          width: 100%;
          height: inherit;
          background-color: $module-hover-bg;
          &:hover {
            background-color: $module-hover-bg-darken-10;
          }
        }
      }
      .edit {
        position: relative;
        flex-grow: 1;
        text-align: right;
        line-height: 30px;
        > .setting {
          font-size: $font-size-h6;
          margin-left: $gap;
          display: inline-block;
          position: relative;

          &:hover {
            > .user-tool {
              display: block;
            }
          }

          > .iconfont {
            margin-right: 8px;
            font-size: 1em;
            vertical-align: baseline;
          }

          > .account-setting {
            text-transform: capitalize;
          }

          > .user-tool {
            display: none;
            position: absolute;
            right: 0;
            top: 2em;
            margin: 0;
            padding: 0;
            padding-top: 0.5rem;
            list-style-type: square;
            z-index: 99;
            color: $text-reversal;

            > li {
              padding: 0 1rem;
              background-color: rgba(green, 0.5);
            }

            > li:hover {
              background-color: rgba(green, 0.8);
            }
          }
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
        .will-reply {
          margin-bottom: 10px;
          > .reply-user {
            display: flex;
            justify-content: space-between;
            margin-bottom: $gap;
            padding: 0 $gap;
            height: 2.6em;
            line-height: 2.6em;
            background-color: $module-hover-bg;

            &:hover {
              background-color: $module-hover-bg-darken-10;
            }
          }

          > .reply-preview {
            max-height: 10em;
            overflow: auto;
            padding: $gap;

            background-color: $module-hover-bg;

            &:hover {
              background-color: $module-hover-bg-darken-10;
            }
          }
        }
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
            &:empty:before {
              content: attr(placeholder);
              color: rgba(0, 0, 0, 0.38);
            }
            &:focus {
              content: none;
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
    list-style: none;
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
            line-height: 2rem;
            color: rgba(0, 0, 0, 0.26);
            font-size: 12.432px;
            font-weight: bolder;
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
            &.liked {
              color: #ff5722;
              > .iconfont {
                color: #ff5722;
              }
            }
          }
        }
      }
    }
  }
}
</style>
