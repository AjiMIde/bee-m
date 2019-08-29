<template>
  <div class="home">
    <div class="bee-flex-box">
      <div class="bee-flex-f-1">AAA</div>
      <div class="bee-flex-f-2">BBB</div>
      <div class="bee-flex-f-3">CCC</div>
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
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: { }
}
</script>

<style lang="scss">
  @import "../styles/bee.reset";
  @import "../styles/bee.markdown";
  @import "../styles/bee.flex";
  @import "../styles/bee.btn";
</style>
<style lang="scss">
  .home {
    .bee-flex-box {
      > div {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 8px;
      }
    }
  }
</style>
