<template>
  <div v-cloak id="app" :class="theme">
    <pc-main-view v-if="!isMobile" />
    <mobile-main-view v-else />
  </div>
</template>

<script>
import PcMainView from '~/components/layout/pc'
import MobileMainView from '~/components/layout/mobile'
export default {
  name: 'App',
  components: {
    PcMainView,
    MobileMainView,
  },
  computed: {
    isMobile() {
      return this.$store.state.global.isMobile
    },
    theme() {
      return this.$store.state.global.theme
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  color: $text;
  background-color: $body-bg;
  &[v-cloak] {
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
}
</style>
