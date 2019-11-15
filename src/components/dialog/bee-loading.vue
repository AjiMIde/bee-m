<template>
  <div class="bee-loading">

    <transition name="bee-loading-ani">
      <div class="bee-l-container bee-fixed bee-fb-C" v-show="show">
        <transition name="bee-loading-ani">
          <div class="bee-l-body" v-show="show">
            <div class="bee-l-loading-icon">
              <bee-icon icon="loading-b" color="#ffffff" :font-size="50"></bee-icon>
            </div>
            <div class="bee-l-loading-content" v-if="content !== ''">{{content || ''}}</div>
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
  @import "../../styles/base/variable/color";
  @import "./_bee-dialog";

  .bee-loading {
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
      animation: linear 2s loading-rotate infinite;
      .bee-icon {
        padding: 12px 0 6px 0;
      }
    }
    .bee-l-loading-content {
      color: #fff;
      font-size: 1.2em;
      padding: 12px 0;
    }
  }
</style>

