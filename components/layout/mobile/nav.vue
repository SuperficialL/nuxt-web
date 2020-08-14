<template>
  <aside class="aside">
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
  </aside>
</template>

<script>
export default {
  name: 'Nav',
  computed: {
    categories() {
      return this.$store.state.category.data
    },
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
      display: block;
      &.link-active {
        color: #0088f5;
        font-weight: bold;
        background-color: #eee;
      }
    }
  }
}
</style>
