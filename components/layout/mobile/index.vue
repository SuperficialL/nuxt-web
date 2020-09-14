<template>
  <div id="app-mobile">
    <div id="app-aside" :class="sidebarOpenClass">
      <nav-view :class="sidebarOpenClass"></nav-view>
    </div>
    <div id="app-main" :class="sidebarOpenClass">
      <div
        v-if="onMobileSidebar"
        class="close-mask"
        @click="closeMobileSidebar"
      />
      <header>
        <header-view />
      </header>
      <main id="main">
        <nuxt :nuxt-child-key="$route.name" />
      </main>
      <footer>
        <footer-view />
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderView from './header'
import NavView from './nav'
import FooterView from './footer'

export default {
  name: 'PcMain',
  components: {
    HeaderView,
    NavView,
    FooterView,
  },
  computed: {
    ...mapState('global', ['onMobileSidebar']),
    sidebarOpenClass() {
      return { open: this.onMobileSidebar }
    },
  },
  methods: {
    closeMobileSidebar() {
      if (this.onMobileSidebar) {
        this.$store.commit('global/updateMobileSidebarOnState', false)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#app-mobile {
  $aside-width: 68%;
  // height: 100vh;
  #app-aside {
    width: $aside-width;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 9999;
    transform: translate3d(-100%, 0, 0);
    transition: all 0.4s ease-in;
    background-color: #34393d;
    &.open {
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      transition: all 0.4s ease-in-out;
      -webkit-overflow-scrolling: touch;
    }
  }
  #app-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: all 0.4s ease-in;
    .close-mask {
      position: fixed;
      width: 100%;
      height: 100%;
      right: 0;
      bottom: 0;
      z-index: 2020;
      background-color: rgba(0, 0, 0, 0.5);
    }
    &.open {
      transition: all 0.4s ease-in-out;
      transform: translate3d($aside-width, 0, 0);
    }
    header {
      position: fixed;
      top: 0;
      width: 100%;
      height: 60px;
      z-index: 10;
      background-color: rgba(255, 255, 255, 0.9);
    }
    main {
      flex: 1;
      padding: 70px 10px 20px;
    }
    footer {
    }
  }
}
</style>
