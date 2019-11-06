<template>
  <div :style="blkStyle">
    <svg class="bee-icon" aria-hidden="true" :color="color">
      <use :xlink:href="'#icon-' + icon"></use>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#333333'
    },
    fontSize: { // 指定宽度大小
      type: Number,
      default: 16
    }
  },
  components: {
  },
  computed: {
    blkStyle () {
      return {
        display: 'inline-block',
        fontSize: this.fontSize + 'px'
      }
    }
  },
  data () {
    return { }
  },
  methods () {
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
  // icon 预设
  .bee-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>

