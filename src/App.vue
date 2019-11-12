<template>
  <div id="app">
    <div id="nav" style="text-align: left;">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <div>
        <h3>Styles</h3>
        <div class="nav-list">
          <router-link to="/examples/reset">reset&others</router-link>
          <router-link to="/examples/flex">flex</router-link>
          <router-link to="/examples/buttons">buttons</router-link>
          <router-link to="/examples/bee-icons">icons</router-link>
        </div>
      </div>

      <div>
        <h3>Styles</h3>
        <div class="nav-list">
          <router-link to="/examples/the-style">the-style</router-link>
        </div>
      </div>

       <div>
        <h3>Components: </h3>
        <div class="nav-list">
          <router-link to="/examples/bee-pop">bee-popup</router-link>
          <router-link to="/examples/bee-dialog">bee-dialog</router-link>
          <router-link to="/examples/bee-dialog">bee-dialog</router-link>
        </div>
      </div>

      <div>
        <h3>Picker</h3>
        <div class="nav-list">
          <router-link to="/examples/bee-picker">bee-picker</router-link>
        </div>
      </div>

    </div>
    <router-view/>
  </div>
</template>

<script>
require('./styles/icon/iconfont')
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  .nav-list {
    display: flex;
    a {
      display: inline-block;
      width: 33.3333%;
      color: #42b983;
      &.router-link-exact-active {
        color: red;
      }
    }
  }
}
</style>

<!--引入全局的 bee css-->
<style lang="scss">
  // icon 预设
  .bee-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  // 全局 scss
  @import "./styles/bee.reset";
  @import "./styles/bee.markdown";
  @import "./styles/bee.flex";
  @import "./styles/bee.btn";
  @import "./styles/bee.tool";
</style>

<!--自定义的可阅读的小型格式-->
<style lang="scss">
  @import "./styles/base/variable/font";
  #app {
    .blk {
      font-family: $font-ant-d;
      font-size: 16px;
      color: #314659;
      text-align: left;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .content {
        padding: 20px;
      }
      .code {
        display: inline-block;
        color: #ff7875;
        padding: 6px 8px;
        background-color: #f6f6f6;
        border-radius: 2px;
      }
    }
  }
</style>
