<template>
  <div id="app">
    <app-header />
    <div class="main">
      <div class="wrap">
        <div class="content">
          <nuxt />
        </div>
        <app-sidebar class="sidebar-wrap" />
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
import AppSidebar from '@/components/SideBar'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
  },
}
</script>

<style lang="scss">
#app {
  .main {
    min-height: calc(100vh - 160px);
    .wrap {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      // 左边内容容器
      .content {
        width: 70% !important;
      }

      // 侧边栏
      .sidebar-wrap {
        width: 280px;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .wrap {
    .content {
      width: 100%;
    }

    .sidebar-wrap {
      display: none;
    }
  }
}
</style>
