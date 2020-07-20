<template>
  <header class="header">
    <div class="wrap">
      <h1 class="logo">
        <nuxt-link to="/">
          SuperficialL Blog
        </nuxt-link>
      </h1>
      <ul class="nav-list">
        <li class="nav-item">
          <nuxt-link :to="{ name: 'index' }" exact>
            <i class="el-icon-s-home" />
            首页
          </nuxt-link>
        </li>
        <li v-for="(root, index) in nav" :key="index" class="nav-item">
          <nuxt-link
            :to="{
              name: 'category-slug',
              params: { slug: root.slug, title: root.name },
            }"
          >
            <i class="iconfont" :class="root.icon" />
            {{ root.name }}
            <i
              v-if="root.children && root.children.length"
              class="iconfont icon-down"
            />
          </nuxt-link>
          <ul v-if="root.children.length" class="sub-menu">
            <li
              v-for="child in root.children"
              :key="child._id"
              class="sub-item"
            >
              <nuxt-link
                :to="{
                  name: 'category-slug',
                  params: { slug: child.slug, title: child.name },
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
  </header>
</template>

<script>
import { mapState } from 'vuex'
import { arrayToTree } from '@/utils'
export default {
  name: 'Header',
  computed: {
    ...mapState('category', ['menu']),
    nav() {
      return arrayToTree(this.menu)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
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
    .nav-list {
      flex: 1;
      display: flex;
      height: 100%;
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
          &.link-active {
            font-weight: bold;
            color: #0088f5;
          }
        }
        .sub-menu {
          position: relative;
          top: 10px;
          width: 100%;
          background-color: #fff;
          box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
          transition: all 0.3s;
          transform-origin: 0 0;
          transform: rotateX(-90deg);
          &:before {
            content: '';
            position: absolute;
            top: -16px;
            left: 50%;
            margin-left: -4px;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-bottom-color: #fff;
          }

          .sub-item {
            width: 100%;
            text-align: left;
            transition: text-indent 0.4s;
            a {
              display: block;
              padding: 10px 20px;
            }
            &:hover {
              text-indent: 5px;
              background-color: #0088f5;
              > a {
                color: #fff;
              }
            }
          }
        }
        &:hover > .sub-menu {
          transform: rotateX(0);
          transition: transform 0.3s;
        }
      }
    }
  }
}
</style>
