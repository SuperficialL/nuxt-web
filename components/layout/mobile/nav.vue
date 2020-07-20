<template>
  <aside class="aside">
    <ul class="nav-list">
      <li class="nav-item">
        <nuxt-link :to="{ name: 'index' }" exact>
          <i class="el-icon-s-home" />
          首页
        </nuxt-link>
      </li>
      <li v-for="(root, index) in menu" :key="index" class="nav-item">
        <nuxt-link
          :to="{
            name: 'category-slug',
            params: { slug: root.slug, title: root.name },
          }"
        >
          <i class="iconfont" :class="root.icon" />
          {{ root.name }}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Nav',
  computed: {
    ...mapState('category', ['menu']),
  },
}
</script>

<style lang="scss" scoped>
aside {
  display: block;
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
  .nav-list {
    .nav-item {
      height: 40px;
      line-height: 40px;
      text-indent: 10px;
      border: none;
      text-decoration: none;
      text-transform: uppercase;
      a {
        display: block;
        &.link-active {
          color: #0088f5;
          font-weight: bold;
          background-color: #eee;
        }
      }
    }
  }
}
</style>
