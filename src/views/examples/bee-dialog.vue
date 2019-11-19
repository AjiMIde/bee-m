<template>
  <div class="exp-bee-toast">
    <button class="bee-btn" @click="click">show toast</button>
    <button class="bee-btn" @click="click2">show fail/error toast</button>
    <button class="bee-btn" @click="click3()">show loading</button>
    <div>利用 use plugin 全局使用 showLoading </div>
    <div>需要在 app.vue 中引入 bee-toast & bee-loading 两个</div>
    <div>并在main.js 中引入 toastPlugin</div>
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
      this.bee.showToast('操作成功！', 'success', 150000)
    },
    click2 () {
      this.bee.showToast('操作失败', 'fail', 1500)
      window.setTimeout(() => {
        this.bee.showToast('操作警告', 'warning', 1500)
      }, 1000)
    },

    click3 () {
      this.bee.showLoading('3s 后全局调用 hideLoading')

      window.setTimeout(() => {
        this.bee.hideLoading()
      }, 3000)
    },
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

