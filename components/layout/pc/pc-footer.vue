<template>
  <footer class="footer">
    <div class="container">
      <div v-if="links.length" class="links">
        <ul class="links-wrap">
          <li v-for="(link, index) in links" :key="index" class="link">
            <a :href="link.address" target="_blank">{{ link.title }}</a>
          </li>
        </ul>
      </div>
      <div class="copy-right">
        CopyRight © Superficial Blog All Rights Reserved.
      </div>
      <div class="beian">
        <a href="/sitemap.xml" target="_blank">站点地图</a>
        <span>·</span>
        <a href="http://beian.miit.gov.cn/" target="_blank"
          >鄂ICP备19027646号-1</a
        >
      </div>
      <div
        class="back-to-top"
        :class="{ show: toTopShow }"
        @click="scrollToTop"
      >
        <i class="iconfont icon-top" />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PCFooter',
  data() {
    return {
      toTopShow: false,
    }
  },
  computed: {
    links() {
      return this.$store.state.link.data
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
.footer {
  width: 100%;
  margin-top: 12px;
  padding: 30px 0;
  line-height: 2em;
  text-align: center;
  background-color: #555e67;
  color: #c9c9c9;
  .links {
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
  .copy-right {
    text-shadow: 0 -1px 0 #333;
  }
  .beian {
    a {
      color: #99a9bf;
    }
  }
  .back-to-top {
    position: fixed;
    right: 30px;
    bottom: 30px;
    z-index: 999;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #fff;
    background-color: #fff;
    box-shadow: 0 4px 10px 0 rgba(138, 141, 147, 0.2);
    cursor: pointer;
    transition: 0.7s;
    transform: translateX(100px);

    &.show {
      transform: translateX(0);
    }
    i {
      font-size: 22px;
      color: #1890ff;
    }
    &.active {
      right: 30px;
    }
  }
}
</style>
