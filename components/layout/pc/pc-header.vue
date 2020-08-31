<template>
  <header class="header">
    <div class="wrap">
      <h1 class="logo">
        <nuxt-link to="/">
          Superficial
        </nuxt-link>
      </h1>
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
        <nuxt-link to="/timeline" class="nav-item">
          <i class="iconfont icon-creation" />
          <span> 时光荏苒 </span>
        </nuxt-link>
        <nuxt-link to="/about" class="nav-item">
          <i class="iconfont icon-user" />
          <span> 关于 </span>
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PCHeader',
  computed: {
    categories() {
      return this.$store.state.category.data
    },
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
        .iconfont {
          vertical-align: top;
          // display: inline-block;
        }
        span {
        }
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
