/*
 * @Author: SuperficialL
 * @Date: 2020-07-08 14:07:21
 * @LastEditTime: 2020-07-11 20:22:34
 * @Description: 数组转树结构
 */
import parser from 'ua-parser-js'
import gravatar from 'gravatar'
const BezierEasing = require('bezier-easing')

/**
 * @description: 把一维数组变为树结构
 * @param {Array} data 需要转换结构的数组
 * @return {Array} parents 返回结构化后的数组
 */
const arrayToTree = (arr, parent = null) => {
  return arr
    .filter((item) => item.parent === parent)
    .map((item) => {
      return {
        ...item,
        children: arrayToTree(arr, item._id),
      }
    })
}

/**
 * @description: 通过userAgent获取操作系统和浏览器信息
 * @param {String} userAgent userAgent信息
 * @return {Object} parseResult 返回操作系统和浏览器信息
 */
const uaParser = function (userAgent) {
  const parseResult = parser(userAgent || '')
  const browserName = String(parseResult.browser.name).toLowerCase()
  const isBrowser = (browsers) => {
    return browsers.some((browser) => browser.toLowerCase() === browserName)
  }
  return {
    result: parseResult,
    isIE: isBrowser(['compatible', 'MSIE', 'IE']),
    isEdge: isBrowser(['Edge']),
    isFirefox: isBrowser(['Firefox']),
    isChrome: isBrowser(['Chrome', 'Chromium']),
    isSafari: isBrowser(['Safari']),
    isWechat: isBrowser(['Wechat']),
    isIos: parseResult.os.name === 'iOS',
    isAndroid: parseResult.os.name === 'Android',
    isMobile: parseResult.device.type === 'mobile',
  }
}

/**
 * @description: 通过 email 获取操用户头像
 * @param {String} email 邮箱
 * @return {String} avatar 返回用户头像地址
 */
const getGravatarByEmail = (email) => {
  const avatar = gravatar.url(email, { protocol: 'https' })
  // avatar = avatar.replace('https://s.gravatar.com/avatar', API.GRAVATAR)
  // avatar += `?x-oss-process=style/gravatar`
  return avatar
}

const _ = {
  $(selector) {
    return document.querySelector(selector)
  },
  on(element, events, handler) {
    if (!Array.isArray(events)) {
      events = [events]
    }
    events.forEach((event) => {
      element.addEventListener(event, handler, { passive: true })
    })
  },
  off(element, events, handler) {
    if (!Array.isArray(events)) {
      events = [events]
    }
    events.forEach((event) => {
      element.removeEventListener(event, handler)
    })
  },
}

export const Easing = {
  ease: [0.25, 0.1, 0.25, 1.0],
  linear: [0, 0.0, 1, 1.0],
  'ease-in': [0.42, 0.0, 1, 1.0],
  'ease-out': [0, 0.0, 0.58, 1.0],
  'ease-in-out': [0.42, 0.0, 0.58, 1.0],
}

const scrollTo = (target, duration = 500, options) => {
  options = options || {}
  options.easing = Easing.ease

  const page = _.$('html, body')
  const events = [
    'scroll',
    'mousedown',
    'wheel',
    'DOMMouseScroll',
    'mousewheel',
    'keyup',
    'touchmove',
  ]

  let abort = false

  const abortFn = function () {
    abort = true
  }

  _.on(page, events, abortFn)

  let elementY = 0
  const initialY = window.pageYOffset

  if (typeof target === 'number') {
    elementY = target
  } else {
    const element = typeof target === 'string' ? _.$(target) : target
    elementY = initialY + element.getBoundingClientRect().top
  }

  let targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY

  if (options.offset) {
    targetY += options.offset
  }

  const diff = targetY - initialY
  const easing = Reflect.apply(BezierEasing, BezierEasing, options.easing)
  let start

  const done = function () {
    _.off(page, events, abortFn)
    if (abort && options.onCancel) {
      options.onCancel()
    }
    if (!abort && options.onDone) {
      options.onDone()
    }
  }

  if (!diff) return

  window.requestAnimationFrame(function step(timestamp) {
    if (abort) return done()
    if (!start) start = timestamp

    const time = timestamp - start
    let progress = Math.min(time / duration, 1)
    progress = easing(progress)

    window.scrollTo(0, initialY + diff * progress)

    if (time < duration) {
      window.requestAnimationFrame(step)
    } else {
      done()
    }
  })
}

export { arrayToTree, uaParser, getGravatarByEmail, scrollTo }
