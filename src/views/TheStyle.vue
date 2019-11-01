<template>
  <div class="the-style">
    <div class="blk">
      <div class="blk-title">flex-box使用</div>
      <div class="blk-content">
        <div class="blk-code">.bee-flex-box>.bee-flex-f-1(2,3,...12)</div>
      </div>
    </div>

    <div class="bee-flex-box">
      <div class="bee-flex-f-1">AAA</div>
      <div class="bee-flex-f-2">BBB</div>
      <div class="bee-flex-f-3">CCC</div>
    </div>

    <div class="bee-flex-box">
      <div class="bee-flex-f-1">
        <div class="bee-flex-box bee-flex-column">
          <div class="bee-flex-f-1">AA</div>
          <div class="bee-flex-f-1">BB</div>
          <div class="bee-flex-f-1">CC</div>
        </div>
      </div>
      <div class="bee-flex-f-1 bee-flex-box bee-flex-column">
          <div class="bee-flex-w-6">AA</div>
          <div class="bee-flex-w-12">BB</div>
      </div>
    </div>

    <div class="btn-example">
      <button class="bee-btn bee-btn-md">普通按钮</button>
      <button class="bee-btn bee-btn-sm">小按钮</button>
      <button class="bee-btn bee-btn-bg">大按钮</button>
    </div>
    <div class="btn-example">
      <button class="bee-btn bee-btn-primary">首选项</button>
      <button class="bee-btn bee-btn-danger">危险</button>
      <button class="bee-btn bee-btn-success">成功</button>
      <button class="bee-btn bee-btn-info">信息</button>
      <button class="bee-btn bee-btn-warn">警告</button>
    </div>

    <div>
      <button class="bee-btn" @click="toggle('show1')">显示</button>
      <bee-popup v-show="show1" @onMaskTap="toggle('show1')">
        <div>
          <div>fajflakjdfljdlkajf</div>
          <button class="bee-btn bee-btn-info">信息</button>
          <button class="bee-btn bee-btn-warn">警告</button>
        </div>
      </bee-popup>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import BeePopup from '@/components/bee-popup.vue'

export default {
  name: 'home',
  components: {
    BeePopup
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
    }
  }
}
</script>

<style lang="scss">
  .home {
    .bee-flex-box {
      > div {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 8px;
        margin: 10px;
      }
    }
  }
</style>
