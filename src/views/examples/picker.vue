<template>
  <div class="exp-picker">
    <button class="bee-btn" @click="showDatePicker">显示 date picker</button>
    <button class="bee-btn" @click="showListPicker">显示 list picker</button>
    <button class="bee-btn" @click="showPrivatePicker">显示 自定义样式 picker</button>

    <bee-date-picker rowFormat="y-M-d" ref="datePicker" @valuechange="datePicker1" @select="datePicker2"
                     @change="datePicker3" value="1999-08-08"></bee-date-picker>
    <bee-list-picker ref="listPicker" :data="data"></bee-list-picker>

    <bee-list-picker class="private-class" ref="privatePicker" :data="data"></bee-list-picker>
  </div>
</template>

<script>
import BeeDatePicker from '@/components/picker/bee-date-picker.vue'
import BeeListPicker from '@/components/picker/bee-list-picker.vue'

export default {
  components: {
    BeeDatePicker, BeeListPicker
  },
  data () {
    return {
      data: [[ 11, 22, 33, 44, 55 ]]
    }
  },
  methods: {
    showPrivatePicker () {
      this.$refs.privatePicker.show()
    },
    showDatePicker () {
      this.$refs.datePicker.show()
    },
    showListPicker () {
      this.$refs.listPicker.show()
    },
    datePicker1 (a, b, c) {
      console.log('valuechange', a, b, c)
    },
    datePicker2 (a, b, c) {
      console.log('select', a, b, c)
    },
    datePicker3 (a, b, c) {
      console.log('change', a, b, c)
    },
  },
  mounted () {
  },
  created () {
  },
  watch: {}
}
</script>

<style lang="scss">
  .bee-picker.private-class {
      $panel-bg-cl: yellow;

      $btn-cl-1: red;
      $btn-cl-2: blue;
      $btn-fz: 24px;
      $btn-pd: 10px 12px;
      $btn-bd: 1px solid #e4e4e4;

      $wheel-wrapper-pd: 0 16px;
      $wheel-item-h: 22px;
      $wheel-item-fz: 12px;
      $wheel-item-cl: #333;

      $picker-footer-h: 20px;

      .picker-panel { background-color: $panel-bg-cl; }

      .picker-choose {
        font-size: $btn-fz;
        padding: $btn-pd;
        border-bottom: $btn-bd;
        .confirm { color: $btn-cl-1; }
        .confirm.scrolling { color: $btn-cl-2; }
        .cancel { color: $btn-cl-2; }
      }

      .picker-content {
        .mask-top, .mask-bottom {
          height: $wheel-item-h*2;  // 两个 item 单位
        }
      }

      .wheel-wrapper {
        padding: $wheel-wrapper-pd;
        .wheel {
          height: $wheel-item-h*5;
          .wheel-scroll {
            margin-top: $wheel-item-h*2;
            line-height: $wheel-item-h;
            .wheel-item {
              font-size: $wheel-item-fz;
              height: $wheel-item-h;
              color: $wheel-item-cl;
            }
          }
        }
      }

      .picker-footer {
        height: $picker-footer-h;
      }
    }
</style>

