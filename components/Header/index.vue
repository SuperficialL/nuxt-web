<template>
  <header class="header">
    <div class="header-container" :class="{ fixed: isFixed }">
      <div class="wrap">
        <div class="nav-container">
          <div class="logo">
            <nuxt-link to="/">
              SuperficialL Blog
            </nuxt-link>
          </div>
          <ul class="nav-menu">
            <li class="nav-item">
              <nuxt-link to="/" exact>
                <i class="el-icon-s-home" />
                首页
              </nuxt-link>
            </li>
            <li v-for="(root, index) in menu" :key="index" class="nav-item">
              <nuxt-link
                :to="{
                  name: 'category',
                  params: { id: root._id },
                  query: { title: root.name },
                }"
              >
                <i class="iconfont" :class="root.icon" />
                {{ root.name }}
                <i
                  v-if="root.children && root.children.length"
                  class="iconfont icon-down"
                />
              </nuxt-link>
              <ul class="sub-menu">
                <li
                  v-for="child in root.children"
                  :key="child._id"
                  class="sub-item"
                >
                  <nuxt-link
                    :to="{
                      name: 'category',
                      params: { id: child._id },
                      query: { title: child.name },
                    }"
                    exact
                  >
                    <i class="iconfont" :class="child.icon" />
                    {{ child.name }}
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      isFixed: true,
    }
  },
  computed: {
    ...mapState(['menu']),
  },
  mounted() {
    let oldTop = 0
    window.onscroll = () => {
      const top = document.scrollingElement.scrollTop
      // 触发滚动条，记录数值
      // 旧数据大于当前位置，表示滚动条top向上滚动
      if (oldTop > top) {
        this.isFixed = true
      } else {
        // 相反...
        this.isFixed = false
      }
      oldTop = top
      // 更新旧的位置
    }
  },
  methods: {
    playing() {},
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 60px;
  z-index: 10;
  .header-container {
    position: fixed;
    top: 0;
    width: inherit;
    height: inherit;
    background-color: #fff;
    transition: 0.4s;
    transform: translateY(-100%);
    &.fixed {
      transform: translateY(0);
    }
  }
  .wrap {
    width: 1200px;
    margin: 0 auto;
    .logo {
      cursor: pointer;
    }
    .nav-container {
      display: flex;
      align-items: center;
      height: inherit;
      &.show {
        transform: translateX(0);
      }
      .nav-menu {
        display: flex;
        height: inherit;
        .nav-item {
          position: relative;
          height: inherit;
          text-align: center;
          & > a {
            display: block;
            padding: 0 20px;
            height: inherit;
            line-height: 60px;
            &:hover {
              color: #0088f5;
            }
          }
          & > .sub-menu {
            top: 100%;
            left: 0;
            z-index: 9;
            min-width: 100px;
            overflow: hidden;
            background: #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
            transform-origin: 0 0;
            transform: rotateX(-90deg);
            a {
              display: block;
              padding: 10px 15px;
            }
            .sub-item {
              text-align: left;
            }
            .sub-item:hover a {
              color: #0088f5;
            }
          }
          &:hover > ul {
            transform: rotateX(0);
            transition: all 0.3s;
          }
        }
      }
    }
    .search-box {
      cursor: pointer;
      & > i {
        display: none;
        font-size: 22px;
        cursor: pointer;
      }
      .search-wrapper {
        display: flex;
        align-items: center;
        border-radius: 4px;
        overflow: hidden;
      }
    }
  }
}
</style>
