<template>
  <div class="notice" :class="{ mobile: isMobile }">
    <div class="title">
      <span class="icon-box">
        <i class="iconfont icon-laba"></i>
      </span>
    </div>
    <transition name="module" mode="out-in">
      <empty-box
        class="notice-empty-box"
        key="empty"
        v-if="!notice.data.length"
      >
        <slot>理屈词穷</slot>
      </empty-box>
      <div key="swiper" class="swiper-box" v-else>
        <div
          class="swiper"
          v-swiper:swiper="swiperOption"
          @transitionStart="handleSwiperTransitionStart"
        >
          <div class="swiper-wrapper">
            <div
              :key="index"
              class="swiper-slide slide-item"
              v-for="(item, index) in notice.data"
            >
              <div class="content">{{ item.content }}</div>
            </div>
          </div>
        </div>
        <div class="navigation">
          <div
            class="button prev"
            :class="{ disabled: activeIndex === 0 }"
            @click="prevSlide"
          >
            <i class="iconfont icon-up" />
          </div>
          <div
            class="button next"
            :class="{ disabled: activeIndex === notice.length - 1 }"
            @click="nextSlide"
          >
            <i class="iconfont icon-down" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import EmptyBox from '@/components/archive/empty'
export default {
  name: 'index-notice',
  props: {
    notice: {
      type: Object,
    },
  },
  components: {
    EmptyBox,
  },
  data() {
    return {
      activeIndex: 0,
      swiperOption: {
        height: 34,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        allowTouchMove: false,
        slidesPerView: 1,
        setWrapperSize: true,
        direction: 'vertical',
      },
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.global.isMobile
    },
    language() {
      return this.$store.state.global.language
    },
  },
  methods: {
    prevSlide() {
      this.swiper.slidePrev()
    },
    nextSlide() {
      this.swiper.slideNext()
    },
    handleSwiperTransitionStart() {
      this.activeIndex = this.swiper.activeIndex || 0
    },
  },
}
</script>

<style lang="scss">
$notice-height: 3rem;

.notice {
  position: relative;
  margin-bottom: $lg-gap;
  height: $notice-height;
  line-height: 2.75em;
  overflow: hidden;
  color: $text-reversal;
  font-size: $font-size-h6;
  background-color: $module-bg;
  user-select: none;

  &.mobile {
    margin-bottom: $gap;
    background-color: $module-hover-bg-darken-10;

    > .swiper {
      .slide-item {
        > .content {
          max-width: 90%;
        }
      }
    }
  }

  > .title {
    float: left;
    width: 10%;
    text-align: center;
    font-size: $font-size-base;
    .icon-box {
      display: inline-block;
      color: #000;
      .iconfont {
        font-size: 20px;
      }
    }
  }

  .notice-empty-box {
    display: block;
    width: auto;
    min-height: auto;
    color: #000;
    text-align: left;
  }

  > .swiper-box {
    float: right;
    width: 90%;
    display: flex;
    .swiper {
      flex: 1;
      .swiper-wrapper[style*='300ms'] {
        .swiper-slide-active {
          .content {
            // @include blur-filter('vertical-small');
          }
        }
      }
      .slide-item {
        width: auto;
        display: flex;
        justify-content: space-between;
        padding-right: $gap * 3;
        height: $notice-height;

        > .content {
          max-width: 76%;
          position: relative;
          color: #000;
          @include text-overflow();
          p {
            margin: 0;
            @include text-overflow();
          }
          a {
            text-decoration: underline;
          }
        }

        .date {
          color: $text-dividers;
        }
      }
    }
    .navigation {
      width: 3rem;
      height: $notice-height;
      display: flex;
      flex-direction: column;
      .button {
        height: 50%;
        text-align: center;
        color: $text-dividers;
        cursor: pointer;
        // @include color-transition();
        &:hover {
          color: $text;
        }
        &.disabled {
          opacity: 0.8;
          color: $text-dividers;
          cursor: no-drop;
        }
        &.prev {
          line-height: 1.2;
        }
        &.next {
          line-height: 1.2;
        }
      }
    }
  }
}
</style>
