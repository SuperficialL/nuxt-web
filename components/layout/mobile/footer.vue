<template>
  <div class="footer-wrapper">
    <div v-if="links.length" class="footer-top-inner">
      <ul class="links-wrap">
        <li v-for="(link, index) in links" :key="index" class="link">
          <a :href="link.address" target="_blank">{{ link.title }}</a>
        </li>
      </ul>
    </div>
    <div class="footer-bottom-inner">© {{ year }} Superficial Blog.</div>
    <div class="back-to-top" :class="{ show: toTopShow }" @click="scrollToTop">
      <i class="iconfont icon-back-top" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileFooter',
  data() {
    return {
      toTopShow: false,
    }
  },
  computed: {
    links() {
      return this.$store.state.link.data
    },
    year() {
      return new Date().getFullYear()
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  methods: {
    handleScroll() {
      // 首先修改相对滚动位置
      this.scrollTop = this.scrollTop =
        window.pageYOffset || document.body.scrollTop
      this.toTopShow = this.scrollTop > 300
    },
    scrollToTop() {
      let timer = null
      const _that = this
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 100
          // 然后修改这里实现动画滚动效果
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
          _that.toTopShow = false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  width: 100%;
  background-color: #555e67;
  color: #c9c9c9;
  .footer-top-inner {
    width: 1260px;
    margin: 0 auto;
    font-size: 16px;
    .links-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .link {
        a {
          display: block;
          padding: 15px;
          color: #c9c9c9;
        }
      }
    }
  }
  .footer-bottom-inner {
    height: 60px;
    line-height: 60px;
    background-color: #383e44;
    text-align: center;
    text-shadow: 0 -1px 0 #333;
  }
  .back-to-top {
    position: fixed;
    right: 30px;
    bottom: 30px;
    z-index: 999;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    line-height: 32px;
    color: #ddd;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 0 10px 0 rgba(138, 141, 147, 0.6);
    cursor: pointer;
    transition: 0.7s;
    transform: translateX(100px);
    overflow: hidden;
    &.show {
      transform: translateX(0);
    }
    i {
      color: rgb(105, 111, 123);
    }
    &.active {
      right: 30px;
    }
  }
}
</style>
