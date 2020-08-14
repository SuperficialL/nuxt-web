<template>
  <div class="app-main">
    <header-view />
    <main id="main">
      <div class="wrap">
        <div id="content" :class="{ 'full-view': isShowSide }">
          <nuxt :nuxt-child-key="$route.name" />
        </div>
        <div v-if="!isShowSide" id="aside">
          <aside-view />
        </div>
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

export default {
  name: 'PcMain',
  components: {
    HeaderView,
    FooterView,
    AsideView,
  },
  computed: {
    ...mapState('global', ['isShowSide']),
  },
}
</script>

<style lang="scss" scoped>
main {
  min-height: calc(100vh - 60px - 60px - 20px * 2);
  margin: 20px 0;
  .wrap {
    display: flex;
    justify-content: space-between;
    #content {
      width: 840px;
      &.full-view {
        width: 100%;
      }
    }
    #aside {
      width: 320px;
    }
  }
}
</style>
