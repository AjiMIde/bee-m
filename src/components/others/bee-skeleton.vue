<template>
  <div class="bee-skeleton">
    <div class="bee-sk-item bee-fb" v-for="i in 3" :key="i">
      <div class="bee-sk-avatar"></div>
      <div class="bee-sk-list bee-fx-f-1">
        <div class="bee-sk-item bee-fx-w-8"></div>
        <div class="bee-sk-item bee-fx-w-10"></div>
        <div class="bee-sk-item bee-fx-w-12"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  methods: {},
  mounted () {
  },
  created () {
  },
  watch: {}
}
</script>

<style lang="scss">
  /*覆盖样式可以选择如下：*/
  .bee-skeleton {
    padding: 0;
    .bee-sk-item { margin: 0; }
    .bee-sk-avatar, .bee-sk-item { background-color: #fff; }
    .bee-sk-avatar { width: 0; height: 0; }
    .bee-sk-list { margin: 0; }
    .bee-sk-item { height: 0; border-radius: 0; margin: 0; }
  }

  .bee-skeleton {
    padding: 0 p2r(36) p2r(36) p2r(36);

    @keyframes ant-skeleton-loading {
      0% { background-position: 100% 50% }
      100% { background-position: 0 50% }
    }

    .bee-sk-item {
      margin-bottom: 20px;
      .bee-sk-avatar, .bee-sk-item {
        background-color: #dfdfdf;
        /*background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);*/
        /*background-size: 400% 100%;*/
        /*animation: ant-skeleton-loading 2.4s ease infinite;*/
      }
      .bee-sk-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .bee-sk-list {
        margin: -4px 0 0 14px;
      }
      .bee-sk-item {
        height: 20px;
        border-radius: 3px;
        margin-top: 10px;
      }
    }
  }
</style>

