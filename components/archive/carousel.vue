<template>
  <div class="carousel" :class="{ mobile: isMobile }">
    <transition name="module" mode="out-in">
      <div
        key="swiper"
        v-swiper:swiper="swiperOption"
        class="swiper index"
        @transitionStart="handleSwiperTransitionStart"
        @transitionEnd="handleSwiperTransitionEnd"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(articleItem, index) in articleList.slice(0, 9)"
            :key="index"
            class="swiper-slide slide-item"
          >
            <div class="content filter">
              <nuxt-link :to="`/article/${articleItem.id}`" class="link">
                <img :src="articleItem.thumbnail" :alt="articleItem.title" />
                <span class="title">{{ articleItem.title }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"
        ></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Carousel',
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      renderSwiper: true,
      transitioning: false,
      swiperOption: {
        // autoplay: {
        //   delay: 3500,
        //   disableOnInteraction: false,
        // },
        pagination: {
          clickable: true,
          el: '.swiper-pagination',
        },
        setWrapperSize: true,
        observeParents: true,
        // 禁用 PC 拖动手指样式
        grabCursor: false,
        // 警用 PC 拖动
        simulateTouch: false,
        preloadImages: false,
        lazy: true,
      },
    }
  },
  computed: {
    ...mapState('global', ['isMobile']),
    articleList() {
      const articles = [...this.article.data.data].slice(0, 9)
      return articles
    },
  },
  activated() {
    this.renderSwiper = true
    this.handleSwiperTransitionEnd()
  },
  deactivated() {
    this.renderSwiper = false
  },
  methods: {
    handleSwiperTransitionStart() {
      this.transitioning = true
    },
    handleSwiperTransitionEnd() {
      this.transitioning = false
    },
  },
}
</script>

<style lang="scss">
.carousel {
  .swiper-pagination {
    .swiper-pagination-bullet {
      &.swiper-pagination-bullet-active {
        width: 2rem;
        border-radius: 10px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$pc-carrousel-height: 310px;
$mobile-carrousel-height: calc((100vw - 2rem) * 0.35);

.carousel {
  height: $pc-carrousel-height;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  user-select: none;
  // @include module-blur-bg();

  &.mobile {
    margin-bottom: $gap;
    height: $mobile-carrousel-height;

    > .swiper {
      .slide-item {
        > .content {
          height: $mobile-carrousel-height;

          > .title {
            right: 1.7rem;
            max-width: 70%;
          }
        }
      }
    }
  }

  > .swiper {
    .slide-item {
      > .content {
        width: 100%;
        height: $pc-carrousel-height;
        position: relative;
        overflow: hidden;

        > .link {
          display: block;
          width: 100%;
          height: 100%;
        }

        img {
          width: 100%;
          height: inherit;
          transform: scale(1);
          transition: transform 0.88s;

          &:hover {
            transform: scale(1.06);
          }
        }

        .title {
          position: absolute;
          margin: 0;
          top: 1.5rem;
          right: 2rem;
          color: $link-color;
          padding-right: 0.6em;
          padding-left: 1em;
          height: 2em;
          line-height: 2em;
          font-size: 1em;
          font-weight: bold;
          border-radius: 1px;
          letter-spacing: 0.3px;
          max-width: 75%;
          // @include text-overflow;
          -webkit-background-clip: text;
          background: linear-gradient(
            90deg,
            transparent 0%,
            $module-bg 2em,
            $module-bg-opacity-9,
            $text-reversal
          );

          &:hover {
            // color: $text-darken;
            padding-left: 0.6em;
            // background-color: $module-bg;
          }
        }
      }
    }
  }
}
</style>
