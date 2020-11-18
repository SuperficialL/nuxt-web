<template>
  <header class="header">
    <div class="wrap">
      <h1 class="logo">
        <nuxt-link to="/"> Superficial </nuxt-link>
      </h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PCHeader',
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 10;
  background-color: #fff;
  .wrap {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-size: 24px;
      cursor: pointer;
    }
  }
}
</style>
