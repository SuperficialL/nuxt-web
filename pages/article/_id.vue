<template>
  <div class="wrap">
    <div class="content">
      <section class="article-wrap">
        <article class="article">
          <h3 class="title">{{ article.title }}</h3>
          <div class="article-meta">
            <span v-if="article.created_time">
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
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="article-content" v-html="articleContent" />
        </article>
      </section>

      <comment-box :article-id="articleId" :likes="article.likes"></comment-box>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommentBox from '@/components/CommentBox'
import marked from '@/plugins/marked'
export default {
  name: 'Detail',
  components: {
    CommentBox,
  },
  validate({ params }) {
    return params.id && !isNaN(Number(params.id))
  },
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('article/getArticleDetail', params),
      store.dispatch('comment/fetchList', { article_id: params.id }),
    ])
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('article', ['article']),
    opinios() {
      return ''
    },
    articleId() {
      return Number(this.$route.params.id)
    },
    articleContent() {
      const { content } = this.article
      if (!content) {
        return ''
      }
      return marked(content, true)
    },
  },
  methods: {},
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
          vertical-align: middle;
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
</style>
