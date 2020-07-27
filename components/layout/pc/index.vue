<template>
  <div class="app-main">
    <header-view />
    <main id="main">
      <div class="wrap">
        <div id="content">
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
import HeaderView from './header'
import FooterView from './footer'
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
  margin: 20px 0;
  .wrap {
    display: flex;
    justify-content: space-between;
    #content {
      width: 840px;
    }
    #aside {
      width: 320px;
    }
  }
}
</style>
