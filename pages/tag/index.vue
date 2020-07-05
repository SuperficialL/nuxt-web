<template>
  <div class="content">
    <div class="breadcrumb">
      <div class="category-title">
        <h4>当前分类: {{ title }}</h4>
        <span>共 {{ total }} 篇</span>
      </div>
    </div>
    <section class="article-wrapper">
      <article v-for="article in articles" :key="article._id" class="article">
        <nuxt-link
          class="article-thumbnail"
          :to="{
            name: 'detail',
            params: { id: article._id, title: article.title },
          }"
        >
          <img
            class="thumbnail"
            :src="article.thumbnail"
            :alt="article.title"
          />
        </nuxt-link>
        <div class="article-content">
          <h3 class="title">
            <span class="classify">{{ article.category.name }}</span>
            <nuxt-link
              :to="{
                name: 'detail',
                params: { id: article._id, title: article.title },
              }"
            >
              {{ article.title }}
            </nuxt-link>
          </h3>
          <div class="summary">
            {{ article.content }}
          </div>
          <div class="article-info">
            <div class="article-meta">
              <span>
                <i class="iconfont icon-msnui-time-detail" />
                {{ article.created_time | dateFormat }}
              </span>
              <span>
                <i class="iconfont icon-eye" />
                {{ article.views }}
              </span>
              <span>
                <i class="iconfont icon-pinglun" />
                {{ article.likes }}
              </span>
              <span>
                <i class="iconfont icon-dianzan" />
                {{ article.likes }}
              </span>
            </div>
            <nuxt-link
              class="detail-btn"
              :to="{
                name: 'detail',
                params: { id: article._id, title: article.title },
              }"
            >
              阅读全文
              <i class="iconfont icon-next" />
            </nuxt-link>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Category',
  data() {
    return {}
  },
  computed: {
    ...mapState(['articles']),
  },
  watch: {},
  created() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
}
.category-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 6px;
}
</style>
