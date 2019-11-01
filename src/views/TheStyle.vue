<template>
  <div class="the-style" style="padding: 0 30px;">

    <div class="blk"> <div class="code">.bee-fb>.bee-fx-f-1(2,3,...12)</div> </div>

    <div class="bee-fb">
      <div class="bee-fx-f-1">AAA</div>
      <div class="bee-fx-f-2">BBB</div>
      <div class="bee-fx-f-3">CCC</div>
    </div>

    <div class="blk"> <div class="code">.bee-fb>.bee-fx-w-1(2,3...12), flex-wrap: wrap(预置)</div> </div>

    <div class="bee-fb">
      <div class="bee-fx-w-1">AA</div>
      <div class="bee-fx-w-2">BB</div>
      <div class="bee-fx-w-3">CC</div>
      <div class="bee-fx-w-4">DD</div>
      <div class="bee-fx-w-5">EE</div>
      <div class="bee-fx-w-6">EE</div>
    </div>

    <div class="blk">
      <div class="code">行布局.bee-fb.bee-fb-R>.bee-fx-w-6 (预置为 行布局，一般无需要再次指定)</div>
    </div>
    <div class="blk">
      <div class="code">列布局.bee-fb.bee-fb-C>.bee-fx-w-6</div>
    </div>

    <div class="bee-fb">
      <div class="bee-fb bee-fx-f-1">
        <div class="bee-fx-f-1" style="height: fit-content;">AA</div>
        <div class="bee-fx-f-1" style="height: fit-content;">BB</div>
        <div class="bee-fx-f-1" style="height: fit-content;">CC</div>
      </div>
      <div class="bee-fb bee-fb-C bee-fx-f-1">
        <div class="bee-fx-f-1">AA</div>
        <div class="bee-fx-f-1">BB</div>
        <div class="bee-fx-f-1">CC</div>
      </div>
    </div>

    <div class="blk"> <div class="code">垂直居中：.bee-fb-C[justify-content: center;]</div> </div>
    <div class="blk"> <div class="code">水平居中：.bee-fb-C[justify-content: center;]</div> </div>
    <div class="bee-fb">
      <div class="bee-fb bee-fb-C bee-fx-f-1" style="height: 200px; justify-content: center;">
        <div class="bee-fx-w-11" style="height: fit-content;">AA</div>
        <div class="bee-fx-w-11" style="height: fit-content;">AA</div>
      </div>
      <div class="bee-fb bee-fx-f-1" style="justify-content: center">
        <div class="bee-fx-w-2" style="height: fit-content;">AA</div>
        <div class="bee-fx-w-2" style="height: fit-content;">AA</div>
      </div>
    </div>

    <div class="blk"> <div class="code">水平垂直居中：.bee-fb-C/.bee-fb-R[justify-content: center;align-items:center]</div> </div>
    <div class="bee-fb">
      <div class="bee-fb bee-fb-C bee-fx-f-1" style="height: 200px; justify-content: center; align-items: center;">
        <div class="bee-fx-w-2" style="height: fit-content;">AA</div>
        <div class="bee-fx-w-2" style="height: fit-content;">AA</div>
      </div>
      <div class="bee-fb bee-fx-f-1" style="justify-content: center; align-items: center;">
        <div class="bee-fx-w-2" style="height: fit-content;">AA</div>
        <div class="bee-fx-w-2" style="height: fit-content;">AA</div>
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
