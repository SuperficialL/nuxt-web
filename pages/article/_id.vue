<template>
  <div class="wrap">
    <div class="content">
      <section class="article-wrap">
        <article class="article">
          <h3 class="title">{{ article.title }}</h3>
          <div class="article-meta">
            <span v-if="article.created_time">
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
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="article-content" v-html="articleContent" />
        </article>
      </section>

      <section class="actions-wrap">
        <ul class="actions">
          <li :class="{ liked: opinios }" @click="liked">
            <i class="iconfont icon-black-dianzan" />
            赞 ({{ article.likes }})
          </li>
        </ul>
        <div class="prev">前一篇:{{ article.prev }}</div>
        <div class="next">后一篇:{{ article.next }}</div>
      </section>

      <!-- <comment-box></comment-box> -->
    </div>
  </div>
</template>

<script>
// import gravatar from 'gravatar'
import { mapState } from 'vuex'
// import CommentBox from '@/components/CommentBox'
import marked from '@/plugins/marked'
export default {
  name: 'Detail',
  components: {
    // CommentBox,
  },
  validate({ params }) {
    return params.id && !isNaN(Number(params.id))
  },
  fetch({ store, params }) {
    return store.dispatch('article/getArticleDetail', params)
  },
  data() {
    return {
      comments: [],
      username: {
        validate: false,
        message: '',
        value: '',
      },
      email: {
        validate: false,
        message: '',
        value: '',
      },
      content: {
        validate: false,
        message: '',
        value: '',
      },
      site: {
        validate: false,
        message: '',
        value: '',
      },
    }
  },
  computed: {
    ...mapState({
      article: (state) => state.article.detail,
    }),
    opinios() {
      return ''
      // return Cookies.get(`article_liked_${this.id}`)
    },
    articleContent() {
      const { content } = this.article
      if (!content) {
        return ''
      }
      return marked(content, true)
    },
  },
  created() {
    // this.fetchArticle()
    // this.fetchComments()
  },
  methods: {
    checkContent() {
      if (!this.content.value) {
        this.content.validate = true
        this.content.message = '来点内容吧!'
      } else {
        this.content.validate = false
      }
    },

    checkAuthor() {
      if (!this.username.value) {
        this.username.validate = true
        this.username.message = '你还没署名呢!'
      } else {
        this.username.validate = false
      }
    },

    checkEmail() {
      if (!this.email.value) {
        this.email.validate = true
        this.email.message = '不写邮箱收不到回复提示哦!'
      } else {
        this.email.validate = false
      }
    },

    submit() {
      this.checkContent()
      this.checkAuthor()
      this.checkEmail()
      if (
        !this.content.validate &&
        !this.username.validate &&
        !this.email.validate
      ) {
        localStorage.setItem(
          'authorInfo',
          JSON.stringify({
            username: this.username.value,
            email: this.email.value,
            site: this.site.value,
          })
        )
        // const data = {
        //   username: this.username.value,
        //   email: this.email.value,
        //   site: this.site.value,
        //   content: this.content.value,
        //   article_id: this.id,
        //   user_agent: navigator.userAgent
        // }
      }
    },

    async liked() {},
    getCookie(name) {
      return ''
      // return Cookies.get(name)
    },

    setCookie(name, value) {
      // const halfHour = new Date(new Date().getTime() + 30 * 60 * 1000)
      // Cookies.set(name, value, { expires: halfHour })
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
}
.content {
  .article-wrap {
    .article {
      padding: 15px;
      background-color: #fff;
      border-radius: 6px;
      .title {
        padding: 10px 0;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
      }
      .article-meta {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #e9eaed;
        text-align: center;
        color: #999;
        span {
          margin-right: 8px;
        }
      }
    }
  }
  .actions-wrap {
    margin: 15px auto;
    padding: 15px;
    border-radius: 6px;
    background: #fff;
    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        padding: 6px 15px;
        border-radius: 4px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        color: #3ca5f6;
        border: 1px solid #3ca5f6;
        &.liked {
          background-color: #4285f4;
          color: #fff;
          i {
            color: #fff;
          }
        }
        &:hover {
          background: #4285f4;
          color: #fff;
          i {
            color: #fff;
          }
        }

        i {
          font-size: 16px;
          color: #4285f4;
        }
      }
    }
  }
  .comment-wrap {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 6px;
    .comment-title {
      padding: 10px 0;
      text-align: center;
      font-size: 16px;
      background-color: #f0f2f7;
      border-radius: 6px;
    }
    .comment-form {
      margin-top: 20px;
      .comment-form-content {
        position: relative;
        box-sizing: border-box;
        textarea {
          background-color: #f0f2f7;
          width: 100%;
          min-height: 70px;
          resize: none;
          padding: 10px;
          border-radius: 6px;
        }
      }
      .comment-info {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .comment-input {
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
      .comment-btn {
        text-align: center;
        .submit-btn {
          background: #1890ff;
          padding: 8px 50px;
          cursor: pointer;
          border-radius: 12px;
        }
      }
      .comment-tips {
        position: absolute;
        left: 0;
        bottom: -14px;
        width: 100%;
        font-size: 12px;
        color: red;
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
              &:hover {
                color: #1890ff;
              }
            }
          }
          .comment-content {
            margin: 10px 0;
            line-height: 2;
          }
          .comment-footer {
            span {
              margin-right: 10px;
            }
            // .created-time {
            // }
            .like {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.article-content {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1rem 0;
    line-height: 1.8em;
    font-weight: 700;
    text-indent: 0;
  }
  p {
    line-height: 2.2em;
    text-indent: 2em;
    margin-bottom: 1em;
  }
  pre {
    position: relative;
    display: block;
    overflow: hidden;
    margin-bottom: 1em;
    padding-left: 3rem;
    font-size: 13.3px;
    background-color: rgba(0, 0, 0, 0.8);
    &::before {
      content: attr(data-lang) ' CODE';
      display: block;
      color: #fff;
      height: 30px;
      line-height: 30px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      font-weight: 700;
      background-color: rgba(68, 68, 68, 0.9);
      text-transform: uppercase;
      text-align: center;
    }
    .code-lines {
      position: absolute;
      left: 0;
      top: 30px;
      margin: 0;
      padding: 9px 0;
      width: 3rem;
      // height: calc(100% - 30px);
      text-align: center;
      color: #555;
      background-color: rgba(0, 0, 0, 0.2);
      .code-line-number {
        position: relative;
        padding: 0;
        list-style-type: none;
        line-height: 30px;
        font-size: 12.432px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: none;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 3rem;
          width: 66em;
          height: 100%;
          background-color: hsla(0, 0%, 60.4%, 0.2);
          opacity: 0;
          visibility: hidden;
        }
        &:hover::before {
          opacity: 1;
          visibility: visible;
        }
        &:hover {
          background-color: hsla(0, 0%, 100%, 0.6);
        }
      }
    }
    code[class*='language-'] {
      display: block;
      float: left;
      margin: 0;
      padding: 9px 0;
      width: 100%;
      height: 100%;
      line-height: 30px;
      color: hsla(0, 0%, 100%, 0.87);
      background-color: transparent;
    }
  }

  img {
    // max-width: 100%;
    width: 100%;
    position: relative;
    margin: 0 auto;
    display: block;
    text-align: center;
    border-radius: 2px;
    border: 0.618rem solid hsla(0, 0%, 77.3%, 0.5);
    opacity: 0.9;
    cursor: pointer;
    box-sizing: border-box;
  }
  ol,
  ul {
    margin-bottom: 1em;
    padding-left: 3em;
    vertical-align: baseline;
    li {
      line-height: 1.8em;
      padding: 0.5em 0.8em;
      &:hover {
        background-color: hsla(0, 0%, 77.3%, 0.5);
      }
    }
  }
}

// .article-detail {
//   line-height: 2;
//   h3 {
//     font-size: 16px;
//     margin-top: 30px;
//     margin-bottom: 10px;
//     padding-left: 10px;
//     border-left: 5px solid #9466ff;
//     background: #f0f2f7;
//   }
//   ul li:hover {
//     background-color: hsla(0, 0%, 77.3%, 0.5);
//   }
//   .code,
//   code:not([class*='lang']) {
//     padding: 2px 5px;
//     background: #f7f7f9;
//     border: 1px solid #e3edf3;
//     border-radius: 3px;
//     font-family: play;
//     color: #d14;
//   }
// }
</style>
