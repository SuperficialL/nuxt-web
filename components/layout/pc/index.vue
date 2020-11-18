<template>
  <div id="app-main">
    <header-view />
    <main id="main" class="main-container" :class="{ 'full-view': isShowSide }">
      <nav-view />
      <div id="main-content" class="main-content">
        <nuxt :nuxtChildKey="$route.name" keep-alive />
      </div>
      <div id="aside">
        <aside-view key="aside" />
      </div>
    </main>
    <footer-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderView from './pc-header'
import FooterView from './pc-footer'
import AsideView from './aside'
import NavView from './nav'
import { startTitleEgg, resetTitle } from '@/services/title-egg'

export default {
  name: 'PcMain',
  components: {
    HeaderView,
    NavView,
    AsideView,
    FooterView,
  },
  mounted() {
    this.autoEggWhenTabActive()
  },
  computed: {
    ...mapState('global', ['isShowSide']),
  },
  methods: {
    autoEggWhenTabActive() {
      document.addEventListener(
        'visibilitychange',
        (event) => {
          event.target.hidden || event.target.webkitHidden
            ? startTitleEgg()
            : resetTitle()
        },
        false
      )
    },
  },
}
</script>

<style lang="scss" scoped>
#app-main {
  // min-height: calc(100vh - 60px - 108px - 20px * 2);
  // margin: 20px 0;
  // .wrap {
  // display: flex;
  // justify-content: space-between;
  .main-container {
    padding-top: 80px;
    position: relative;
    display: flex;
    justify-content: space-between;
    width: $container-width;
    .main-content {
      width: 680px;
      &.full-view {
        width: 100%;
      }
    }
    aside {
      width: 320px;
    }
  }
}
</style>
