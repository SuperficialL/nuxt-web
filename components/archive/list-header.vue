<template>
  <div class="header-box" :class="{ mobile: isMobile }">
    <!-- index page -->
    <h5 v-if="isIndexRoute" class="title">
      最新文章
    </h5>
    <!-- category -->
    <h5
      v-else-if="currentCategory"
      :key="`category-${currentCategory.slug}`"
      class="title"
    >
      当前分类 : <span>{{ currentCategory.name || '...' }}</span>
    </h5>

    <!-- tag -->
    <h5 v-else-if="currentTag" :key="`tag-${currentTag.slug}`" class="title">
      当前分类 : <span>{{ currentTag.name }}</span>
    </h5>

    <!-- date -->
    <!-- <h5 v-else-if="currentDate" :key="`date-${currentDate}`" class="title">
          <span v-if="isEnLang">
            <span>{{ currentDate }}&nbsp;</span>
            <span>articles</span>
          </span>
          <span v-else>
            <span>发布于</span>
            <span>&nbsp;{{ currentDate }}&nbsp;</span>
            <span>的所有文章</span>
          </span>
        </h5> -->

    <!-- search -->
    <!-- <h5
          v-else-if="currentKeyword"
          :key="`search-${currentKeyword}`"
          class="title"
        >
          <span v-if="isEnLang">
            <span>"{{ currentKeyword }}"</span>
            <span>related articles</span>
          </span>
          <span v-else>
            <span>和</span>
            <span>&nbsp;"</span>
            <span>{{ currentKeyword }}</span>
            <span>"&nbsp;</span>
            <span>有关的所有文章</span>
          </span>
        </h5> -->
  </div>
</template>

<script>
export default {
  name: 'ArticleListHeader',
  computed: {
    isIndexRoute() {
      return this.$route.name === 'index'
    },
    currentTag() {
      return this.$store.state.tag.data.find((tag, index, arr) => {
        return Object.is(tag.slug, this.$route.params.slug)
      })
    },
    // currentTagIconClass() {
    //   return this.getExtendsValue(this.currentTag, 'icon') || 'icon-tag'
    // },
    currentCategory() {
      return this.$store.state.category.data.find((category, index, arr) => {
        return Object.is(category.slug, this.$route.params.slug)
      })
    },
    // currentCategoryIconClass() {
    //   return (
    //     this.getExtendsValue(this.currentCategory, 'icon') || 'icon-category'
    //   )
    // },
    // currentBackgroundImage() {
    //   const tagBg = this.getExtendsValue(this.currentTag, 'background')
    //   const cateBg = this.getExtendsValue(this.currentCategory, 'background')
    //   return tagBg || cateBg
    // },
    // currentBackgroundColor() {
    //   const tagBg = this.getExtendsValue(this.currentTag, 'bgcolor')
    //   const cateBg = this.getExtendsValue(this.currentCategory, 'bgcolor')
    //   return tagBg || cateBg || 'transparent'
    // },
    // currentDate() {
    //   return this.$route.params.date
    // },
    // currentKeyword() {
    //   return this.$route.params.keyword
    // },
    isMobile() {
      return this.$store.state.global.isMobile
    },
  },
  methods: {
    // getExtendsValue(target, key) {
    //   if (!target || !target.extends.length) {
    //     return null
    //   }
    //   const targetExtend = target.extends.find((t) => Object.is(t.name, key))
    //   return targetExtend ? targetExtend.value : null
    // },
  },
}
</script>

<style lang="scss" scoped>
.header-box {
  position: relative;
  // padding-bottom: 8px 0;
  // display: flex;
  // flex-direction: column;
  // height: 30px;
  // color: $text-reversal;

  &.mobile {
    height: 12rem;

    > .logo-box {
      height: 8.6rem;

      > .logo {
        line-height: 8.6rem;

        > .iconfont {
          font-size: 5em;
        }
      }
    }
  }

  @keyframes logo-animate {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    33% {
      opacity: 0.8;
      transform: scale(0.9) rotateY(0deg);
    }
    66% {
      opacity: 0.8;
      transform: scale(0.9) rotateY(360deg);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  > .title {
    margin: 0;
    text-transform: capitalize;
  }
}
</style>
