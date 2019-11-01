<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
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
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
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
      .blk-title {
        font-size: 18px;
        font-weight: bold;
      }
      .blk-content {
        padding: 20px;
      }
      .blk-code {
        display: inline-block;
        color: #ff7875;
        padding: 6px 8px;
        background-color: #f6f6f6;
        border-radius: 2px;
      }
    }
  }
</style>
