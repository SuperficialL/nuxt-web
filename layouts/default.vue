<template>
  <div v-cloak id="app" @scroll="scroll($event)">
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
  },
  methods: {
    scroll(ev) {
      console.log(ev)
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  color: #000;
  &[v-cloak] {
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
}
</style>
