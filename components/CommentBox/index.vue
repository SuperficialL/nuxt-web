<template>
  <section class="comment-wrap">
    <h4 class="comment-title">
      共 {{ article.comments }} 条评论关于 “{{ article.title }}”
    </h4>
    <div class="comment-form">
      <div class="comment-form-content">
        <textarea
          id="content"
          v-model="content.value"
          cols="100"
          rows="5"
          placeholder="请填写正确QQ邮箱，以便于更好的与您取得联系，否则您的留言可能会被删除!"
          @blur="checkContent"
        />
        <span v-show="content.validate" class="comment-tips">{{
          content.message
        }}</span>
      </div>
      <div class="comment-info">
        <div class="comment-input comment-form-username">
          <label for="username" />
          <input
            id="username"
            v-model="username.value"
            type="text"
            placeholder="昵称*"
            @blur="checkAuthor"
          />
          <span v-show="username.validate" class="comment-tips">{{
            username.message
          }}</span>
        </div>
        <div class="comment-input comment-form-email">
          <label for="email" />
          <input
            id="email"
            v-model="email.value"
            type="email"
            placeholder="邮箱*"
            @blur="checkEmail"
          />
          <span v-show="email.validate" class="comment-tips">{{
            email.message
          }}</span>
        </div>
        <div class="comment-input comment-form-site">
          <label for="site" />
          <input id="site" v-model="site.value" type="url" placeholder="站点" />
        </div>
      </div>
      <div class="comment-btn">
        <input
          class="submit-btn"
          value="发表评论"
          type="submit"
          @click="submit"
        />
      </div>
    </div>
    <ul class="comment-list">
      <li v-for="comment in comments" :key="comment._id" class="comment-item">
        <div class="comment-avatar">
          <img :src="comment.avatar" alt />
        </div>
        <div class="comment-body">
          <div class="comment-header">
            <a :href="comment.site" class="username">{{ comment.username }}</a>
            <ua :ua="comment.ua" />
          </div>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-footer">
            <span class="created-time">{{ comment.created_time }}</span>
            <span class="like" @click="liked">
              <i class="iconfont icon-dianzan" /> 赞(0)
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import ua from './components/ua'
export default {
  name: 'Comment',
  components: {
    ua,
  },
}
</script>

<style lang="scss" scoped></style>>
