<template>
  <div class="message-page">
    <div class="detail">
      <h4 class="title">留言板</h4>
      <div class="content">
        欢迎来到我的博客，尽情的留下你的脚印吧!
      </div>
    </div>
    <div class="comment">
      <comment :article-id="0" :likes="100"></comment>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/comment'
export default {
  name: 'Message',
  components: {
    Comment,
  },
  fetch({ store }) {
    return Promise.all([
      // store.dispatch('global/fetchAppOption'),
      store.dispatch('comment/fetchList', { article_id: 0 }),
    ])
  },
  computed: {
    // siteLikes() {
    //   const appOption = this.$store.state.global.appOption.data
    //   return appOption ? appOption.meta.likes : 0
    // },
    // isEnLang() {
    //   return this.$store.getters['global/isEnLang']
    // },
    isMobile() {
      return this.$store.state.global.isMobile
    },
  },
}
</script>

<style lang="scss" scoped>
.message-page {
  .detail {
    padding: 15px;
    background: #fff;
    border-radius: 4px;
    .title {
      margin-bottom: 20px;
      font-size: 20px;
      text-align: center;
    }
    content {
    }
  }
  .comment {
  }
}
</style>
