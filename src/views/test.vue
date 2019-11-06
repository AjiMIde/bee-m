<template>
  <div class="test">
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
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
