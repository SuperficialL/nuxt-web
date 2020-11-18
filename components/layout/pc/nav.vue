<template>
  <div id="nav" class="aside-nav">
    <nav class="nav-list">
      <nuxt-link to="/" exact class="nav-item">
        <i class="iconfont icon-home" />
        <span> 首页 </span>
      </nuxt-link>
      <nuxt-link
        v-for="(category, i) in categories"
        :key="i"
        :to="{
          name: 'category-category_slug',
          params: {
            category_slug: category.slug,
            title: category.name,
          },
        }"
        class="nav-item"
      >
        <i class="iconfont" :class="category.icon" />
        <span>
          {{ category.name }}
        </span>
      </nuxt-link>
      <nuxt-link to="/message" class="nav-item">
        <i class="iconfont icon-creation" />
        <span> 留言板 </span>
      </nuxt-link>
      <nuxt-link to="/about" class="nav-item">
        <i class="iconfont icon-user" />
        <span> 关于 </span>
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.category.data
    },
  },
}
</script>

<style lang="scss" scoped>
#nav {
  width: 160px;
  height: auto;
  .nav-list {
    width: 160px;
    position: fixed;
    .nav-item {
      position: relative;
      display: block;
      height: inherit;
      line-height: 40px;
      padding: 0 10px;
      .iconfont {
        vertical-align: top;
      }
      &:hover {
        color: #0088f5;
      }
      &.link-active {
        font-weight: bold;
        color: #0088f5;
        @include module-blur-bg();
      }
    }
  }
}
</style>
