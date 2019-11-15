export default {
  install (Vue, option) {
    // 添加全局 mixin
    window.beeEventBus = new Vue()

    Vue.mixin({
      data () {
        this.bee = {
          showLoading (content = '加载中...', duration = -1) {
            window.beeEventBus.$emit('eventShowLoading', content, duration)
          },

          hideLoading () {
            window.beeEventBus.$emit('eventHideLoading')
          },

          showToast (content = '', icon = '', duration = 1500) {
            window.beeEventBus.$emit('eventShowToast', content, icon, duration)
          },

          hideToast () {
            window.beeEventBus.$emit('eventHideToast')
          }
        }
        return {}
      },
      methods: {
      },
      mounted () {

      },
      components: {}
    })
  }
}

