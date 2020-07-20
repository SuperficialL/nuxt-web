<template>
  <nav>
    <span @click.stop.prevent="toggleSidebar(!onMobileSidebar)">
      <i class="iconfont icon-menu"></i>
    </span>
    <nuxt-link to="/">SuperficialL Blog</nuxt-link>
    <span @click.stop.prevent="searchKeyWords">
      <i class="iconfont icon-search"></i>
    </span>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      search: '',
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
    toggleSidebar(open) {
      this.$store.commit('global/updateMobileSidebarOnState', open)
    },
    searchKeyWords() {
      this.$message({
        type: 'info',
        message: '开发中~',
        showClose: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  padding: 0 10px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    .iconfont {
      font-size: 24px;
    }
  }
}
</style>
