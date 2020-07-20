<template>
  <div class="app-main">
    <header-view />
    <main id="main">
      <div class="wrap">
        <div class="content">
          <nuxt :nuxt-child-key="$route.name" />
        </div>
        <aside-view key="aside" />
      </div>
    </main>
    <footer-view />
  </div>
</template>

<script>
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
}
</script>

<style lang="scss" scoped>
main {
  margin: 20px 0;
  .wrap {
    display: flex;
    justify-content: space-between;
    .content {
      width: 840px;
    }
  }
}
</style>
