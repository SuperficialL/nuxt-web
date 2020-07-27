<template>
  <header class="header">
    <div class="wrap">
      <h1 class="logo">
        <nuxt-link to="/">
          SuperficialL Blog
        </nuxt-link>
      </h1>
      <nav class="nav-list">
        <nuxt-link to="/" exact class="nav-item">
          <i class="el-icon-s-home" />
          <span> 首页 </span>
        </nuxt-link>
        <nuxt-link
          v-for="(item, i) in categories"
          :key="i"
          :to="{
            name: 'category-slug',
            params: { slug: item.slug, title: item.name },
          }"
          class="nav-item"
        >
          <i class="iconfont" />
          {{ item.name }}
        </nuxt-link>
        <nuxt-link to="/message" class="nav-item">
          <i class="iconfont icon-message" />
          <span> 留言墙 </span>
        </nuxt-link>
        <nuxt-link to="/about" class="nav-item">
          <i class="iconfont icon-message" />
          <span> 关于 </span>
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState('category', ['categories']),
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 60px;
  z-index: 10;
  background-color: #fff;
  .wrap {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-size: 24px;
      cursor: pointer;
    }
    .nav-list {
      flex: 1;
      display: flex;
      align-content: center;
      height: 100%;
      .nav-item {
        position: relative;
        display: block;
        padding: 0 20px;
        height: inherit;
        line-height: 60px;
        text-align: center;
        &:hover {
          color: #0088f5;
        }
        &.link-active {
          font-weight: bold;
          color: #0088f5;
        }
      }
    }
  }
}
</style>
