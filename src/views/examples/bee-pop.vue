<template>
  <div class="exp-bee-pop">
    <button @click="show=!show">{{show ? 'hide' : 'show'}}</button>
    <bee-popup :show="show" @onMaskTap="show=!show" >
      <div style="background-color: #fff;padding: 80px;">???!!!</div>
    </bee-popup>
  </div>
</template>

<script>
import BeePopup from '@/components/bee-popup.vue'

export default {
  components: {
    BeePopup
  },
  data () {
    return {
      show: false
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
