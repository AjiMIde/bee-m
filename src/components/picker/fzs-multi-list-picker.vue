<template>
  <transition name="picker-fade">
    <div class="fzs-multi-list-picker" v-show="state===1" @touchmove.prevent @click="cancel">
      <transition name="picker-move">
        <div class="picker-panel" v-show="state===1" @click.stop>

          <div class="picker-choose flex-box">
            <span class="cancel flex-item-1" @click="cancel">取消</span>
            <span class="confirm flex-item-1" @click="confirm">确认</span>
          </div>

          <div class="picker-content">
            <div class="wrapper" ref="wrapper">
              <ul class="wrapper-content" @click="itemClick">
                <li v-for="(item, index) in pickerData" class="wrapper-item" :key="index" :data-index="index"
                    :class="{'selected': pickerSelectedIndex.indexOf(index) > -1}">
                  {{item.text}}
                </li>
              </ul>
            </div>
          </div>

        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
/**
 * 使用说明：
 * 需要传入一个一维数组 data [1, 2, 3, 4, 5]
 */
// todo 添加一个 mask 样式
import BScroll from 'better-scroll'

const STATE_HIDE = 0
const STATE_SHOW = 1
const COMPONENT_NAME = 'multiPicker'
const EVENT_SELECT = 'select'
const EVENT_CANCEL = 'cancel'

export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    selectedIndex: {
      type: Array,
      default () {
        return [] // 当有多个列时，需要定义多个默认选中的 index，如 [1, 2, 3]
      }
    }
  },
  data () {
    return {
      myScroll: '',                 // bsScroll 滚动对象
      state: STATE_HIDE,            // 当前状态 hide/show

      pickerData: this.data.slice(),           // 列数据 [{text: 'AAA', value: 'a'}, ...]
      pickerSelectedIndex: this.selectedIndex // 列选择下标们：[1, 2, 3]
    }
  },
  created () {
  },
  methods: {
    /**
     * 显示
     * 当没有 scroll 的时候，创建 scroll ，这种情况用于，第一次加载的时候
     * 当有轮子的时候， refresh scroll
     */
    show () {
      if (this.state === STATE_SHOW) {
        return
      }
      this.state = STATE_SHOW
      if (!!this.myScroll === false) {
        this.$nextTick(() => {
          this.myScroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
        })
      } else {
        this.$nextTick(() => {
          this.myScroll.refresh()
          this.myScroll.enable()
        })
      }
    },

    /**
     * confirm 数据
     * 一共给出 selectedObj 选中的对象们 selectedVal 选中的值们 selectedIndex 选中的下标们
     */
    confirm () {
      this.hide()

      let selectedObj = []
      let selectedVal = []
      let selectedIndex = [] // 防止有不合法的数据被使用者传入，这里还需要做过滤
      for (let index of this.pickerSelectedIndex) {
        let item = this.pickerData[index]
        if (item) {
          selectedObj.push(this.pickerData[index])
          selectedVal.push(this.pickerData[index]['value'])
          selectedIndex.push(index)
        }
      }

      this.$emit(EVENT_SELECT, selectedObj, selectedVal, selectedIndex)
    },

    // 取消
    cancel () {
      this.hide()
      this.$emit(EVENT_CANCEL)
    },

    /**
     * hide the picker
     * disable scroll
     */
    hide () {
      this.state = STATE_HIDE
      this.myScroll.disable()
    },

    itemClick (evt) {
      let ele = evt.target
      if (ele.nodeName === 'LI') {
        evt.stopPropagation()
        let index = parseInt(ele.getAttribute('data-index'))
        if (this.pickerSelectedIndex.indexOf(index) > -1) {
          this.pickerSelectedIndex.splice(this.pickerSelectedIndex.indexOf(index), 1)
        } else {
          this.pickerSelectedIndex.push(parseInt(index))
        }
      }
    },
    x () {
    }

  },
  watch: {
    data (newData) {
      this.pickerData = newData.slice()
      this.$nextTick(() => {
        this.myScroll.refresh()
      })
    }
  }
}
</script>

<style scoped lang="scss">

  $bgc-mask: rgba(37, 38, 45, .4);
  $c-grey: #999;
  $c-white: #fff;
  $c-main: #333;

  $fz-medium: 14 * 2px; /*px*/
  $fz-big: 16 * 2px; /*px*/

  $panel-h: 200 * 2px; /*px*/
  $panel-choose-h: 35 * 2px; /*px*/
  $panel-wrapper-h: $panel-h - $panel-choose-h; /*px*/
  $wrapper-item-h: 36 * 2px; /*px*/

  @import "../../assets/fzs-pos-variable";

  .fzs-multi-list-picker {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    background-color: $bgc-mask;
    &.picker-fade-enter, &.picker-fade-leave-active {
      opacity: 0;
    }
    &.picker-fade-enter-active, &.picker-fade-leave-active {
      transition: all .3s ease-in-out;
    }

    //
    .picker-panel {
      position: absolute;
      z-index: 600;
      bottom: 0;
      width: 100%;
      background: $c-white;
      height: $panel-h; /*px*/
      &.picker-move-enter, &.picker-move-leave-active {
        transform: translate3d(0, $panel-h, 0); /*px*/
      }
      &.picker-move-enter-active, &.picker-move-leave-active {
        transition: all .3s ease-in-out;
      }

      .picker-choose {
        font-size: $fz-medium; /*px*/
        color: $c-grey;
        border-bottom: $border; /*px*/

        height: $panel-choose-h; /*px*/
        line-height: $panel-choose-h; /*px*/
        .confirm, .cancel {
          padding: 0px 12*2px; /*px*/
        }
        .confirm {
          text-align: right;
          color: $PrimaryColor;
          &.scrolling {
            color: $c-grey !important;
          }
        }
        .cancel {
          text-align: left;
          color: $c-grey;
        }
      }

      .picker-content {
        position: relative;
      }

      .wrapper {
        overflow: hidden;
        height: $panel-wrapper-h; /*px*/

        .wrapper-content {
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          // 一定要超过 .wrapper 的高度，才能产生  scroll
          min-height: $panel-wrapper-h + 10px; /*px*/
          line-height: $wrapper-item-h; /*px*/
          list-style: none;
          .wrapper-item {
            font-size: $fz-big; /*px*/
            list-style: none;
            height: $wrapper-item-h; /*px*/
            white-space: nowrap;
            color: $c-main;
          }
          .wrapper-item.selected {
            color: $PrimaryColor;
          }
        }
      }
    }
  }
</style>
