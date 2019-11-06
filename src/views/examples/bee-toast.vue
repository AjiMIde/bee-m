<template>
  <div class="exp-bee-toast">
    <button class="bee-btn" @click="click">click</button>
    <bee-toast ref="beeToast"></bee-toast>
  </div>
</template>

<script>
import BeeToast from '@/components/dialog/bee-toast'
export default {
  components: {
    BeeToast
  },
  data () {
    return { }
  },
  methods: {
    click () {
      console.log('???')
      this.$refs.beeToast.showToast('操作成功！', 1)
      // this.$emit('xxx', 'aa', 'bb', 'cc')
    }
  },
  mounted () {
    console.log(window.m = this)
  },
  created () {
  },
  watch: {
  }
}
</script>

<style lang="scss"></style>

