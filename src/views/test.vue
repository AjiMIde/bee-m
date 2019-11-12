<template>
  <div class="test">
    <bee-date-picker rowFormat="y-M-d" ref="datePicker" @valuechange="valuechange" @select="select"
                     @change="change"></bee-date-picker>
  </div>
</template>

<script>
// @ is an alias to /src
import BeeDatePicker from '@/components/picker/bee-date-picker.vue'

export default {
  name: 'home',
  components: {
    BeeDatePicker
  },
  data () {
    return {
      show1: false,
      x: ''
    }
  },
  methods: {
    toggle (p) {
      this[p] = !this[p]
    },
    valuechange (a, b, c) {
      console.log(a, b, c, 'valueChange')
    },
    select (a, b, c) {
      console.log(a, b, c, 'select')
    },
    change (a, b, c) {
      console.log(a, b, c, 'change')
    }
  },
  mounted () {
    window.h = this
    this.$refs.datePicker.show()
  }
}
</script>

<style lang="scss">
  .home {
    .bee-fb {
      margin-bottom: 20px;
      > div {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 8px;
        margin: 10px;
      }
    }
  }
</style>
