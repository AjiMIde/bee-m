<template>
  <div class="bee-toast" v-if="show">
    <div class="bee-t-mask bee-fixed"></div>
    <div class="bee-t-container bee-fixed bee-fb bee-fb-C">
      <div class="bee-t-body">
        <div class="bee-t-loading-icon">
          <bee-icon v-if="icon === 1" icon="success" color="#ffffff" :font-size="50"></bee-icon>
          <bee-icon v-if="icon === 2" icon="fail" color="#ffffff" :font-size="50"></bee-icon>
          <bee-icon v-if="icon === 3" icon="warn" color="#ffffff" :font-size="50"></bee-icon>
        </div>
        <div class="bee-t-loading-content">{{content || ''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BeeIcon from '../bee-icon'

export default {
  components: { BeeIcon },
  props: {
  },
  data () {
    this.timeout = null

    return {
      show: false,

      content: '',
      icon: 0, // 0 不设置icon, 1 设置为成功, 2 设置为不成功, 3 设置为 warning
      duration: 1500,
    }
  },
  methods: {
    showToast (content = '', icon = 0, duration) {
      this.content = content || ''
      this.icon = [0, 1, 2, 3].indexOf(icon) === -1 ? 0 : icon
      this.duration = duration || this.duration

      window.clearTimeout(this.timeout)

      this.show = true

      if (parseInt(this.duration) === -1) return
      this.timeout = window.setTimeout(() => {
        this.hideToast()
      }, parseInt(this.duration))
    },
    hideToast () {
      this.show = false
    },
    toggleToast () {
      this.show = !this.show
    }

  },
  mounted () {
    console.log(',,,,', this)
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

