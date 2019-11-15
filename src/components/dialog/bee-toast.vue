<template>
  <div class="bee-toast">
    <transition name="bee-loading-ani">
      <div class="bee-t-container bee-fixed bee-fb-C" v-show="show">
        <transition name="bee-loading-ani">
          <div class="bee-t-body" v-show="show">
            <div class="bee-t-loading-icon">
              <bee-icon :icon="icon" color="#ffffff" :font-size="50"></bee-icon>
            </div>
            <div class="bee-t-loading-content">{{content || ''}}</div>
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
  props: {},
  data () {
    this.timeout = null

    return {
      show: false,

      content: '',
      icon: '',             // '' 不设置icon, success/fail/warn
      duration: 1500,
    }
  },
  methods: {
    showToast (content = '', icon = '', duration = 1500) {
      this.content = content
      this.icon = ['success', 'fail', 'warning'].indexOf(icon) === -1 ? '' : icon
      this.duration = duration

      window.clearTimeout(this.timeout)

      this.show = true

      if (parseInt(this.duration) === -1) return
      this.timeout = window.setTimeout(() => {
        this.hideToast()
      }, parseInt(this.duration))
    },

    hideToast () {
      window.clearTimeout(this.timeout)
      this.show = false
    },

    toggleToast () {
      this.show = !this.show
    }

  },
  mounted () {
    window.beeEventBus && window.beeEventBus.$on('eventShowToast', (content = '', icon = '', duration = 1500) => {
      this.showToast(content, icon, duration)
    })

    window.beeEventBus && window.beeEventBus.$on('eventHideToast', () => {
      this.hideToast()
    })
  },
  created () {
    // this.$on('xxx', (a, b, c) => {
    //   console.log(a, b, c)
    // })
  },
  watch: {}
}
</script>

<style lang="scss">
  @import "../../styles/base/variable/color";
  @import "./_bee-dialog";

  .bee-toast {
    .bee-t-mask {

    }
    .bee-t-container {
      justify-content: center;
      align-items: center;
    }
    .bee-t-body {
      background-color: $cl-bg-toast;
      border-radius: 4px;
      width: 50%;
    }
    .bee-t-loading-icon {
      .bee-icon {
        padding: 12px 0 6px 0;
      }
    }
    .bee-t-loading-content {
      color: #fff;
      font-size: 1.2em;
      padding: 12px 0;
    }
  }
</style>

