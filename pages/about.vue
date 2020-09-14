<template>
  <div class="about-page" :class="{ mobile: isMobile }">
    <div class="content">
      <div class="description">
        <div class="item webfont">
          <i class="iconfont icon-user"></i>
          <p class="bio">
            <span>我是 Superficial, 一个前端开发者. </span>
          </p>
        </div>
        <div class="item">
          <i class="iconfont icon-music"></i>
          <nuxt-link to="/music">
            Jazz-HipHop, Electronic, Disco, Rock, Punk
          </nuxt-link>
        </div>
        <div class="item webfont">
          <i class="iconfont icon-like"></i>
          <span>code. beauty. whisky. music. vagrant.</span>
        </div>
        <div class="item webfont">
          <i class="iconfont icon-code"></i>
          <span class="skills">吾生有涯愿无尽，心期填海力移山</span>
        </div>
      </div>
      <div class="information">
        <div class="avatar">
          <img :src="gravatar" draggable="false" />
        </div>
        <h3 class="name">
          <strong>Superficial</strong>
        </h3>
        <p class="skill">JS Stack Developer.</p>
        <!-- <a href class="followme" @click.stop.prevent v-if="!isMobile" /> -->
        <!-- <div class="wechat"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  head() {
    return {
      title: `About`,
    }
  },
  fetch({ store }) {
    return store.dispatch('global/fetchAdminInfo')
  },
  computed: {
    isMobile() {
      return this.$store.state.global.isMobile
    },
    gravatar() {
      return this.$store.state.global.adminInfo.avatar
    },
  },
}
</script>

<style lang="scss" scoped>
.about-page {
  .content {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .description {
      flex-grow: 1;
      padding: 2rem 3rem;
      background-color: $module-bg;

      .item {
        line-height: 2.5em;
        min-height: 2.5em;
        margin-bottom: 1.2rem;

        &.webfont {
          font-family: 'webfont-bolder', DINRegular;
        }

        &:last-child {
          margin-bottom: 0;
        }

        > .iconfont {
          width: 2em;
          font-size: $font-size-h4;
          text-align: center;
          margin-right: 1em;
          display: inline-block;
          color: $text-dividers;

          &.icon-code {
            color: $black;
          }

          &.icon-social {
            color: $primary;
          }

          &.icon-like {
            color: $red;
          }

          &.icon-friend {
            color: $accent;
          }
        }

        > .bio {
          display: inline-block;
          margin: 0;

          &::first-letter {
            font-size: $font-size-h2;
            margin-right: 2px;
          }
        }
      }
    }

    .information {
      position: relative;
      width: 18rem;
      margin-left: $lg-gap;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      background-color: $module-bg;

      &:hover {
        > .avatar {
          transform: rotate(360deg);
        }
      }

      > .avatar {
        width: 8rem;
        height: 8rem;
        z-index: 1;
        margin-top: 5rem;
        max-width: 100%;
        border-radius: 100%;
        border: 5px solid $module-bg;
        box-sizing: content-box;
        transition: transform $transition-time-slow;
        overflow: hidden;
      }

      > .description {
        text-align: center;

        > .skill {
          margin-top: 0.466rem;
        }
      }
    }
  }
}
</style>
