// import ClientType from '../ClientType'
// import FzsErrorLog from '../FzsErrorLog'
// import eventBus from '../vueEventBus'
//
// import TouchButton from '@/components/money/TouchButton.vue'
// import TouchBlock from '@/components/money/TouchBlock.vue'
// import PosHeader from '@/components/ui/header'
//
// import { name } from '@/posInfo'

export default {
  install (Vue, option) {
    // 添加全局 mixin
    Vue.mixin({
      data () {
        return {
          // eventBus: eventBus
        }
      },
      methods: {
        showToast (message, type) {
          // if (this.eventBus) {
          //   this.eventBus.$emit('toast', message, type)
          // }
        }
      },
      mounted () {
      },
      components: {
      }
    })
  }
}

