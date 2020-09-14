<template>
  <div class="about-page" :class="{ mobile: isMobile }">
    <div class="content">
      <div class="description">
        <div class="personal">
          <div class="item">
            <i class="iconfont icon-user"></i>
            <p class="bio">
              <span>我是 Superficial, 一个前端开发者. </span>
            </p>
          </div>
          <div class="item">
            <i class="iconfont icon-like"></i>
            <span>代码. 美女. 游戏. 聚会. 以及一切美好的事物.</span>
          </div>
          <div class="item">
            <i class="iconfont icon-code"></i>
            <span class="skills">人生在勤，不索何获</span>
          </div>
        </div>
        <div class="wish">
          <h6>我想说:</h6>
          <p>坚石途中拦阻路,</p>
          <p>持斧破石为前途.</p>
          <p>不畏艰难远跋涉,</p>
          <p>懈怠类类心中无.</p>
          <p>直奔梦想不停步.</p>
          <p>到天揽月成英雄,</p>
          <p>成事通路漫无头.</p>
          <p>功成名就览群峰.</p>
        </div>
      </div>
      <div class="information">
        <div class="avatar">
          <img :src="gravatar" draggable="false" />
        </div>
        <h3 class="name">
          <strong>Superficial</strong>
        </h3>
        <span class="followme" v-if="!isMobile">Friend Me</span>
        <div class="wechat" v-if="!isMobile"></div>
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
  height: inherit;
  &.mobile {
    > .content {
      flex-direction: column-reverse;

      > .information {
        width: 100%;
        margin-left: 0;
        margin-bottom: $gap;
        flex-direction: row;
        padding: $lg-gap 0;

        > .avatar {
          width: 6rem;
          height: 6rem;
          margin-top: 0;
          margin-left: 6%;
        }

        > .name {
          margin-left: 5%;
          text-align: left;
        }
      }

      > .description {
        width: 100%;
        padding: 1em;
        overflow: hidden;

        > .item {
          @include text-overflow();

          > .iconfont {
            margin-right: $sm-gap;
          }
        }
      }
    }
  }
  .content {
    width: 100%;
    height: inherit;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .description {
      flex-grow: 1;
      padding: 2rem 3rem;
      background-color: #fff;
      .personal {
        .item {
          line-height: 2.5em;
          min-height: 2.5em;
          margin-bottom: 1rem;

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
            vertical-align: top;

            &.icon-code {
              color: $black;
            }

            &.icon-like {
              color: $red;
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
      .wish {
        p {
          padding-left: 2em;
          letter-spacing: 4px;
          &::first-letter {
            font-size: $font-size-h2;
            margin-right: 2px;
          }
          &:last-child {
            margin-bottom: 0;
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
      background-color: #fff;

      &:hover {
        > .avatar {
          transform: rotate(360deg);
        }
        > .wechat {
          opacity: 1;
          visibility: visible;
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
      > .followme {
        margin-top: 1.666rem;
        display: inline-block;
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
        border-radius: 1px;
        width: 56%;
        height: 2.68rem;
        text-align: center;
        line-height: 2.46rem;
      }

      > .skill {
        margin-top: 0.466rem;
      }
      > .wechat {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 59%;
        background-image: url(../static/images/wechat.jpg);
        background-size: contain;
        background-position: bottom;
        opacity: 0;
        z-index: 1;
        background-color: #fff;
        visibility: hidden;
        transition: opacity 0.1s, visibility 0.1s;
      }
    }
  }
}
</style>
