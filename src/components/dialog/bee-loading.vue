<template>
  <div class="bee-dialog bee-loading">

    <transition name="bee-dialog-ani">
      <div class="bee-dialog-container" v-show="show">
        <transition name="bee-dialog-ani">
          <div class="bee-dialog-body" v-show="show">
            <div class="bee-dialog-icon">
              <bee-icon icon="loading-b" color="#ffffff" :font-size="50"></bee-icon>
            </div>
            <div class="bee-dialog-content" v-if="content !== ''">{{content || ''}}</div>
          </div>
        </transition>
      </div>
    </transition>

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
    window.beeEventBus && window.beeEventBus.$on('eventShowLoading', (content, duration) => {
      this.showLoading(content, duration)
    })
    window.beeEventBus && window.beeEventBus.$on('eventHideLoading', () => {
      this.hideLoading()
    })
  },
  created () {
  },
  watch: {}
}
</script>

<style lang="scss">
  @import "../../../styles/base/variable/color";
  @import "./_bee-dialog";

  .bee-loading {
    @keyframes loading-rotate {
      0% {
        transform: rotate(0);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .bee-dialog-icon {
      animation: linear 2s loading-rotate infinite;
    }
  }
</style>

