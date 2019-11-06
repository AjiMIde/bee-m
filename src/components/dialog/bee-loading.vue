<template>
  <div class="bee-loading" v-show="show">
    <div class="bee-fixed"></div>
    <div class="bee-l-container bee-fixed bee-fb bee-fb-C">
      <transition name="bee-loading-ani">
        <div class="bee-l-body" v-show="show">
          <div class="bee-l-loading-icon">
            <bee-icon icon="loading-b" color="#ffffff" :font-size="50"></bee-icon>
          </div>
          <div class="bee-l-loading-content" v-if="content !== ''">{{content || ''}}</div>
        </div>
      </transition>
      </div>
  </div>
</template>

<script>
import BeeIcon from '../bee-icon'

export default {
  components: { BeeIcon },
  data () {
    this.timeout = null
    return {
      show: false,

      content: '加载中',
      duration: -1,
    }
  },
  methods: {
    showLoading (content = '加载中', duration = -1) {
      this.content = content
      this.duration = duration

      window.clearTimeout(this.timeout)

      this.show = true

      if (parseInt(this.duration) === -1) return
      this.timeout = window.setTimeout(() => {
        this.hideLoading()
      }, parseInt(this.duration))
    },

    hideLoading () {
      window.clearTimeout(this.timeout)
      this.show = false
    },

    toggleLoading () {
      this.show = !this.show
    }

  },
  mounted () {
  },
  created () {
  },
  watch: {
  }
}
</script>

<style lang="scss">
  @import "../../styles/base/variable/color";

  .bee-loading {
    .bee-t-mask {

    }
    .bee-l-container {
      justify-content: center;
      align-items: center;
    }
    .bee-l-body {
      background-color: $cl-bg-toast;
      border-radius: 4px;
      width: 50%;
    }
    .bee-l-loading-icon {
      .bee-icon {
        padding: 12px 0 6px 0;
      }
    }
    .bee-l-loading-content {
      color: #fff;
      font-size: 1.2em;
      padding: 12px 0;
    }

    $bee-login-trans: all 0.3s ease-in-out;
    .bee-loading-ani {
      &-enter-active {
        transition: $bee-login-trans;
      }
      &-leave-active {
        transition: $bee-login-trans;
      }
      &-leave-to {
        transform: scale(.98);
        opacity: 0;
      }
      &-enter {
        transform: scale(.95);
        opacity: 0;
      }
    }
  }
</style>

