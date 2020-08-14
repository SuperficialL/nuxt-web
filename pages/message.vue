<template>
  <div class="message-page">
    <div class="message-box">
      <ul>
        <li>
          <span>Superficial:</span>
          <div class="content">
            第四步的特效，看起来有些生硬，我们可以添加Transition来达到平滑动画的效果，另外颜色比较单一，我们可以设置一下不同的颜色
          </div>
        </li>
      </ul>
    </div>
    <div class="submit-box"></div>
  </div>
</template>

<script>
export default {
  name: 'Message',
}
</script>

<style lang="scss" scoped>
.message-page {
  .message-box {
    ul {
      list-style: none;
      display: flex;
      justify-content: space-between;
      li {
        position: relative;
        width: 250px;
        height: 140px;
        padding: 15px;
        background: linear-gradient(-155deg, rgba(0, 0, 0, 0) 1.5rem, #58a 0%);
        &::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          background: linear-gradient(
              to left bottom,
              rgba(0, 0, 0, 0) 50%,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0.4)
            )
            100% 0 no-repeat;
          width: 1.65507em;
          height: 3.5493em;
          transform: translateY(-1.89424em) rotate(-40deg);
          transform-origin: bottom right;
          border-bottom-left-radius: inherit;
          box-shadow: -0.2em 0.2em 0.3em -0.1em rgba(0, 0, 0, 0.15);
        }
        span {
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
