<template>
  <div class="bee-pop">
    <transition name="popup">
      <div class="bee-popup" v-show="show">
        <transition name="popup">
          <div class="bee-popup-mask" v-show="show" @click.self="maskTap"></div>
        </transition>
        <transition name="popup-content">
          <div class="bee-popup-content" v-show="show" :class="'bee-popup-content-' + position" @click.stop="maskTap">
            <slot></slot>
          </div>
        </transition>
        <div class="bee-popup-close" @click="maskTap">
          <svg class="bee-icon" aria-hidden="true" color="#fff">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const EVENT_MASK_TAP = 'onMaskTap'

export default {
  props: {
    // top/center/bottom
    position: {
      type: [String],
      default: 'center'
    },
    show: {
      type: [Boolean],
      default: false
    }
  },
  computed: {},
  methods: {
    maskTap ($evt) {
      this.$emit(EVENT_MASK_TAP, '')
    }
  }
}
</script>

<style lang="scss">
  @import "../styles/base/variable/z-index";
  @import "../styles/base/variable/color";
  @import "../styles/bee.tool";

  .bee-pop {

    .bee-popup {
      @extend .bee-fixed;
      z-index: $z-index-bee-popup;
    }

    .bee-popup-mask {
      @extend .bee-fixed;
      z-index: $z-index-bee-popup;
      background-color: $cl-bg-black-opacity;
    }
    .bee-popup-content {
      z-index: $z-index-bee-popup;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
    }

    .bee-popup-close {
      text-align: right;
      position: absolute;
      z-index: $z-index-bee-popup;
      width: 40px;
      height: 40px;
      top: 10px;
      right: 10px;
      font-size: 20px;
    }

    .bee-popup-content-top {
      justify-content: center;
      align-items: flex-start;
    }
    .bee-popup-content-center {
      justify-content: center;
      align-items: center;
    }
    .bee-popup-content-bottom {
      justify-content: center;
      align-items: flex-end;
    }

    .popup-enter-active, .popup-leave-active {
      transition: all .5s;
    }
    .popup-enter {
      opacity: 0;
      transform: scale(.98);
    }
    .popup-enter-to {
      opacity: 1;
      transform: scale(1);
    }
    .popup-leave {
      opacity: 1;
      transform: scale(1);
    }
    .popup-leave-to {
      opacity: 0;
      transform: scale(.98);
    }

    .popup-content-enter-active, .popup-content-leave-active {
      transition: all .5s;
    }
    .popup-content-enter {
      opacity: 0;
      transform: translate(0, 5%);
    }
    .popup-content-enter-to {
      opacity: 1;
      transform: translate(0, 0);
    }
    .popup-content-leave {
      opacity: 1;
      transform: translate(0, 0);
    }
    .popup-content-leave-to {
      opacity: 0;
      transform: translate(0, 5%);
    }
  }
</style>
