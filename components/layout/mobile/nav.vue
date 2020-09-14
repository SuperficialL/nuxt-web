<template>
  <aside class="aside">
    <div class="aside-user">
      <div class="user-info">
        <div class="avatar">
          <img :src="adminInfo.avatar" alt="Surmon" draggable="false" />
        </div>
        <div class="profile">
          <h3 class="name">{{ adminInfo.username }}</h3>
        </div>
      </div>
      <div class="slogan">前端博客</div>
    </div>
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
          params: { category_slug: category.slug, title: category.name },
        }"
        class="nav-item"
      >
        <i class="iconfont" :class="category.icon" />
        <span>
          {{ category.name }}
        </span>
      </nuxt-link>
      <nuxt-link to="/message" class="nav-item">
        <i class="iconfont icon-user" />
        <span> 留言板 </span>
      </nuxt-link>
      <nuxt-link to="/about" class="nav-item">
        <i class="iconfont icon-user" />
        <span> 关于 </span>
      </nuxt-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Nav',
  mounted() {
    return this.$store.dispatch('global/fetchAdminInfo')
  },
  computed: {
    categories() {
      return this.$store.state.category.data
    },
    adminInfo() {
      return this.$store.state.global.adminInfo
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
  > .aside-user {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: $gap;
    border-bottom: 1px solid darken($mobile-aside-bg, 5%);
    .user-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      > .avatar {
        width: 35%;

        > img {
          max-width: 100%;
          border: 2px solid $module-bg;
        }
      }

      > .profile {
        color: $body-bg;

        > .name {
          font-weight: bold;
          margin-bottom: $gap;
        }
      }
    }
    > .slogan {
      width: 100%;
      height: 30px;
      line-height: 30px;
      margin: 0;
      color: $primary;
      @include text-overflow();
    }
  }
  .nav-list {
    .nav-item {
      display: block;
      height: 40px;
      line-height: 40px;
      padding: 0 10%;
      border: none;
      text-decoration: none;
      text-transform: uppercase;
      &.link-active {
        color: #0088f5;
        font-weight: bold;
        background-color: #eee;
      }
      span {
        vertical-align: middle;
      }
    }
  }
}
</style>
