<template>
  <div id="app" @click.self="toggleContentWidth(false)">
    <div id="nav">
      <nav-list></nav-list>
    </div>

    <div id="content" @click="toggleContentWidth(true)" :class="{'content-big': contentBig}">
      <router-view/>
    </div>

  </div>
</template>

<script>
import NavList from './views/nav'

require('../styles/icon/iconfont')

export default {
  components: {
    NavList
  },
  data () {
    return {
      contentBig: true
    }
  },
  methods: {
    toggleContentWidth (bool) {
      this.contentBig = bool
    }
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
  @import "../styles/bee.reset";
  @import "../styles/bee.markdown";
  @import "../styles/bee.flex";
  @import "../styles/bee.btn";
  @import "../styles/bee.tool";
</style>

<!--自定义的可阅读的小型格式-->
<style lang="scss">
  @import "../styles/base/variable/font";
  html, body{
    height: 100%;
  }
  #app {
    position: relative;
    min-height: 100%;
    overflow: auto;
    #content {
      top: 0;
      bottom: 0;
      right: 0;
      left: 200px;
      position: absolute;
      background-color: rgba(211, 211, 211, 0.8);
      overflow: auto;
    }
    .content-big {
      left: 50px !important;
    }

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
