<template>
  <div class="exp-reset" style="text-align: left;">
    <div>一般来讲，项目的初使化，使用以下文件进行样式重置</div>
    <div>
      @import "./styles/bee.reset";
    </div>

    <div>如果使用 flex 布局、按钮样式，使用：</div>
    <div>
      @import "./styles/bee.flex";
      @import "./styles/bee.btn";
    </div>

    <div>如果使用 px2rem，请使用：</div>
    <div>
      引入 js：libs/px2rem/index.js 并使用 init() 方法 <br>
      引入scss：@import "./styles/px2r"; <br>
      使用 font-size: px2r(12)
    </div>

    <div>如果使用 tool（提供了一些常用的样式如absolute居中）</div>
    <div>
      @import "./styles/bee.tool";
    </div>


    <div>如果想使用 markdown 样式：</div>
    <div>
      @import "./styles/bee.markdown";
    </div>

  </div>
</template>

<script>
export default {
  components: {
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
  .exp-reset{
    div {
      margin-bottom: 8px;
    }
  }
</style>

