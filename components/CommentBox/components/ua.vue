<template>
  <span>
    <span class="os">
      <i v-if="osIconName" class="iconfont" :class="osIconName" />
      {{ uaResult.result.os.name }} {{ uaResult.result.os.version }}
    </span>
    <span class="browser">
      <i class="iconfont" :class="browserIconName" />
      {{ uaResult.result.browser.name }} {{ uaResult.result.browser.major }}
    </span>
  </span>
</template>

<script>
import { uaParser } from '@/utils'

const osIconsNameMap = {
  'Mac OS': 'mac',
  Windows: 'windows',
  Android: 'android',
  Ubuntu: 'ubuntu',
  Linux: 'linux',
  iOS: 'mac',
  Unix: 'unix',
}
const browersIconsNameMap = {
  Chrome: 'chrome',
  Chromium: 'chrome',
  WeChat: 'wechat',
  Safari: 'safari',
  'Mobile Safari': 'safari',
  UCBrowser: 'uc',
  Maxthon: 'maxthon',
  Firefox: 'firefox',
  IE: 'ie',
  Opera: 'opera',
  Edge: 'edge',
}
export default {
  name: 'CommentUa',
  props: {
    ua: {
      type: String,
      required: true,
    },
  },
  computed: {
    uaResult() {
      return uaParser(this.ua)
    },
    osIconName() {
      const osName = this.uaResult.result.os.name
      const iconName = osName && osIconsNameMap[osName]
      return `icon-${iconName}`
    },
    browserIconName() {
      const browserName = this.uaResult.result.browser.name
      const iconName = browserName && browersIconsNameMap[browserName]
      return `icon-${iconName}`
    },
  },
}
</script>
