<template>
  <div class="nav">
    <div class="list" v-for="(o, i) in list" :key="i">
      <h4>{{o.title}}</h4>
      <div class="ary">
        <div v-for="(oo, ii) in o.ary" :key="i + '' + ii">
          <router-link :to="oo.route">{{oo.txt}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav',
  components: {},
  data () {
    return {
      list: [
        {
          title: 'Styles',
          ary: [
            { route: '/examples/reset', txt: 'reset & others' },
            { route: '/examples/flex', txt: 'flex' },
            { route: '/examples/buttons', txt: 'buttons' },
            { route: '/examples/bee-icons', txt: 'icons' },
          ]
        },
        {
          title: 'dialog',
          ary: [
            { route: '/examples/bee-pop', txt: 'bee-popup' },
            { route: '/examples/bee-dialog', txt: 'bee-dialog' },
            { route: '', txt: '' },
            { route: '', txt: '' },
            { route: '', txt: '' },
          ]
        },
        {
          title: '',
          ary: [
            { route: '/examples/bee-picker', txt: 'bee-picker' },
          ]
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  .nav {
    .list {
      text-align: left;
      h4 {
        margin: 10px 0;
        font-weight: bold;
        font-size: 22px;
      }
      .ary {
        padding: 0 0 0 10px;
      }
    }
  }
</style>
