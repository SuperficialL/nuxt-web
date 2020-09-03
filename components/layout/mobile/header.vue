<template>
  <header>
    <form
      class="search"
      :class="{ actived: search }"
      @submit.stop.prevent="toSearch()"
    >
      <input
        ref="input"
        type="text"
        class="input"
        list="keywords"
        required
        v-model.trim="keyword"
        @keyup.enter.stop.prevent="toSearch"
      />
      <span class="close" @click.stop.prevent="search = false">
        <i class="iconfont icon-cancel"></i>
      </span>
    </form>
    <transition name="fade">
      <div v-if="search" class="search-mask"></div>
    </transition>
    <nav class="navbar">
      <span
        class="navbar-menu"
        @click.stop.prevent="toggleSidebar(!onMobileSidebar)"
      >
        <i class="iconfont icon-menu"></i>
      </span>
      <nuxt-link to="/" class="navbar-logo">SuperficialL Blog</nuxt-link>
      <span class="navbar-search" @click.stop.prevent="openSearch">
        <i class="iconfont icon-search"></i>
      </span>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MobileHeader',
  data() {
    return {
      search: false,
      keyword: '',
    }
  },
  computed: {
    onMobileSidebar() {
      return this.$store.state.global.onMobileSidebar
    },
  },
  watch: {
    $route(newVel, oldVel) {
      this.search = false
      this.toggleSidebar(false)
    },
  },
  methods: {
    // 打开搜索
    openSearch() {
      this.search = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    // 切换显示侧边栏
    toggleSidebar(open) {
      this.$store.commit('global/updateMobileSidebarOnState', open)
    },
    // 跳转路由
    toSearch() {
      this.$router.push({
        name: 'search-keyword',
        params: { keyword: this.keyword },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $mobile-header-height;
  background-color: $module-bg-opacity-9;
  z-index: 999;

  .search-mask {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    touch-action: none;
    background-color: $module-hover-bg-darken-10;
  }

  .search {
    position: absolute;
    display: flex;
    z-index: 9999;
    width: 100%;
    height: $mobile-header-height;
    top: 0;
    left: 0;
    opacity: 0;
    background-color: $text-reversal;
    transform: translateY(-100%);

    > .input {
      width: 80%;
      height: 100%;
      padding: 1em;
    }

    > .close {
      width: 20%;
      height: 100%;
      line-height: $mobile-header-height;
      text-align: center;
    }

    &.actived {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  .navbar {
    width: 100%;
    height: $mobile-header-height;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;

    .navbar-menu,
    .navbar-search {
      height: 100%;
      width: 20%;
      line-height: $mobile-header-height;
      text-align: center;
    }

    .navbar-logo {
      width: 30%;
    }
  }
}
// nav {
//   padding: 0 10px;
//   height: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   span {
//     .iconfont {
//       font-size: 24px;
//     }
//   }
// }
</style>
