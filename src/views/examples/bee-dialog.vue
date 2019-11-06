<template>
  <div class="exp-bee-toast">
    <button class="bee-btn" @click="click">click</button>
    <button class="bee-btn" @click="click2()">loading</button>
    <bee-toast ref="beeToast"></bee-toast>
    <bee-loading ref="beeLoading"></bee-loading>
  </div>
</template>

<script>
import BeeToast from '@/components/dialog/bee-toast'
import BeeLoading from '@/components/dialog/bee-loading'

export default {
  components: {
    BeeToast, BeeLoading
  },
  data () {
    return { }
  },
  methods: {
    click () {
      console.log('???')
      this.$refs.beeToast.showToast('操作成功！', 1)
      // this.$emit('xxx', 'aa', 'bb', 'cc')
    },
    click2 () {
      this.$refs.beeLoading.showLoading('加载中', 15000)
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

