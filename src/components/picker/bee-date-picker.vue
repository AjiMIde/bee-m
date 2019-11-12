<template>
  <transition name="picker-fade">
    <div class="bee-picker bee-date-picker" v-show="state===1" @touchmove.prevent @click="cancel">
      <transition name="picker-move">
        <div class="picker-panel" v-show="state===1" @click.stop>
          <!--操作 action bar-->
          <div class="picker-choose bee-fb">
            <span class="cancel" @click="cancel">取消</span>
            <span class="confirm" :class="{'scrolling': scrolling}" @click="confirm">确认</span>
          </div>
          <!--主体 content, 包含遮罩层-->
          <div class="picker-content">
            <div class="mask-top"></div>
            <div class="mask-bottom"></div>
            <div class="wheel-wrapper" ref="wheelWrapper">
              <div class="wheel" v-for="(data, index) in pickerData" :key="index">
                <ul class="wheel-scroll">
                  <li v-for="(item, index2) in data" class="wheel-item" :key="index2">{{item.text}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="picker-footer"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
// todo 添加一个 mask 样式
/**
 * 满足以下功能：
 * show(), hide(), confirm(date) 返回 date, props->dateVal 可传入 date 数据
 */
import BScroll from 'better-scroll/dist/bscroll'
import { getYears, getMonths, getDays, getHours, getMinutes, getSeconds } from './makeData'

const STATE_HIDE = 0
const STATE_SHOW = 1
const COMPONENT_NAME = 'picker'
const EVENT_SELECT = 'select'
const EVENT_VALUE_CHANGE = 'valuechange'
const EVENT_CANCEL = 'cancel'
const EVENT_CHANGE = 'change'

const nowDate = new Date()
const nowDateStr = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()

export default {
  name: COMPONENT_NAME,
  props: {
    value: { type: String, default: nowDateStr }, // 只接受如：yyyy-MM-dd-hh-mm-ss 的格式的数据，未满足条件则会将 : 或 空格 转换成 - 号
    rowFormat: { type: String, default: 'y-M-d' }  // 只接受如：y-M-d-h-m-s 的格式的数据，如 y-M-d，则显示三列：年、月、日
  },
  data () {
    return {
      // 是否滚动中
      scrolling: false,

      // 当前状态 hide/show
      state: STATE_HIDE,

      // 列数据 [[1, 2, 3], [4, 5]]
      pickerData: [],

      // 列选择下标们：[1, 2, 5]
      pickerSelectedIndex: this.selectedIndex,

      // 列选择数据们: ['val1', 'val2', 'val3']
      pickerSelectedVal: [],

      // 列选择文本们： ['txt1', 'txt2', 'txt3']
      pickerSelectedText: [],

      // 行的格式的数组如 y-M-d => [y,M,d]
      rowFormatAry: [],
      // 这三个从上面的 rowFormatAry 计算得知，用来做滚轮响应，因为 年、月的滚动会影响到 日
      yColumnIndex: -1,
      MColumnIndex: -1,
      dColumnIndex: -1
    }
  },
  created: function () {
    this._setPickerData()
    this._setPickerValue()
  },
  methods: {
    /**
     * 初使化 基本数据，三列，年、月、日
     */
    _setPickerData () {
      this.rowFormatAry = this.rowFormat.split('-')
      this.yColumnIndex = this.rowFormatAry.indexOf('y')
      this.MColumnIndex = this.rowFormatAry.indexOf('M')
      this.dColumnIndex = this.rowFormatAry.indexOf('d')
      const newArray = this.rowFormatAry.map((item, index) => {
        if (item === 'y') return getYears(1980, 2050)
        if (item === 'M') return getMonths(1980)
        if (item === 'd') return getDays(1980, 1)
        if (item === 'h') return getHours()
        if (item === 'm') return getMinutes()
        if (item === 's') return getSeconds()
      })
      this.pickerData = this.pickerData.concat(newArray)
    },

    /**
     * 获取 wheelIndex 轮子下面的某 value 的 index
     */
    _getPickerIndex (wheelIndex, value) {
      const array = this.pickerData[wheelIndex]
      if (array) {
        return array.findIndex((item, index) => {
          return item.value === value
        })
      } else {
        return 0
      }
    },

    /**
     * 将props传入的值，设置选中
     */
    _setPickerValue () {
      // 从 dateAry 中分段查找 picker index 并返回到数组中
      this.value = this.value.replace(/\W/g, '-')
      const dateAry = this.value.split('-')
      this.pickerSelectedIndex = dateAry.map((item, index) => {
        return this._getPickerIndex(index, item)
      })
      if (this.state === 1 && this.wheels) {
        this.pickerSelectedIndex.forEach((item, index) => {
          this.wheels[index].wheelTo(this.pickerSelectedIndex[index])
        })
      }
    },

    /**
     * 当一个轮子滚动变化后，需要做出变化
     * 如 年 变化了，月也要变化，紧接着，日 也要变化
     */
    _wheelChange (i) {
      const { yColumnIndex, MColumnIndex, dColumnIndex } = this
      if ((i === 0 || i === 1) && (yColumnIndex === 0 && MColumnIndex === 1 && dColumnIndex === 2)) {
        let yIndex = this.wheels[0].getSelectedIndex()
        let mIndex = this.wheels[1].getSelectedIndex()
        let y = this.pickerData[0][yIndex].value
        let m = this.pickerData[1][mIndex].value
        this.$set(this.pickerData, 2, getDays(y, m))
      }
      this.refresh()
    },

    /**
     * 建造可滚动的轮子
     */
    _createWheel (wheelWrapper, i) {
      if (!this.wheels[i]) {
        this.wheels[i] = new BScroll(wheelWrapper.children[i], { // wheelWrapper.children[i] 用于包裹滚动
          wheel: {
            selectedIndex: this.pickerSelectedIndex[i],
            /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
            wheelWrapperClass: 'wheel-scroll',  // 这个用于滚动
            wheelItemClass: 'wheel-item' // 这个用于显示
          },
          probeType: 3 // 参见文档
        })
        // 当轮子滚动时
        this.wheels[i].on('scroll', () => {
          this.scrolling = true
        })
        // 当轮子停止滚动时，emit change event
        this.wheels[i].on('scrollEnd', () => {
          this.scrolling = false
          this._wheelChange(i)
          this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex())
        })
      } else {
        this.wheels[i].refresh()
      }
      return this.wheels[i]
    },

    //
    // 是否能出数据，当还在移动中，则不能出数据
    //
    _canConfirm () {
      return this.wheels.every((wheel) => {
        return wheel.isInTransition === false
      })
    },

    /**
     * confirm 数据
     */
    confirm () {
      // 还在滚动时不能得到数据
      if (this._canConfirm() === false) {
        return
      }
      this.hide()
      let changed = false

      for (let i = 0; i < this.pickerData.length; i++) {
        let wheel = this.wheels[i] // 一列轮子
        let index = wheel.getSelectedIndex() // 该列轮子的下标

        this.pickerSelectedIndex[i] = index
        let value = null

        if (this.pickerData[i].length) {
          value = this.pickerData[i][index].value
        }

        if (this.pickerSelectedVal[i] !== value) {
          changed = true
        }

        this.pickerSelectedText[i] = this.pickerData[i][index].text
        this.pickerSelectedVal[i] = this.pickerData[i][index].value
      }

      // 如果现值与原值相同，则是 select 事件
      // 如果不同，则多返回一个 value-change 事件
      let aPickerVal = ''
      let bPickerVal = ''
      this.rowFormatAry.forEach((item, index) => {
        if ('y&M&d'.indexOf(item) > -1) {
          aPickerVal += this.pickerSelectedVal[index] + '-'
        }
        if ('h&m&s'.indexOf(item) > -1) {
          bPickerVal += this.pickerSelectedVal[index] + ':'
        }
      })
      let pickerVal = aPickerVal.slice(0, aPickerVal.length - 1)
      if (bPickerVal) {
        pickerVal += ' ' + bPickerVal.slice(0, bPickerVal.length - 1)
      }

      this.$emit(EVENT_SELECT, pickerVal, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
      if (changed) {
        this.$emit(EVENT_VALUE_CHANGE, pickerVal, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
      }
    },

    /**
     * 取消
     */
    cancel () {
      this.hide()
      this.$emit(EVENT_CANCEL)
    },

    /**
     * 显示
     */
    show () {
      if (this.state === STATE_SHOW) {
        return
      }
      this.state = STATE_SHOW
      // 当没有轮子的时候，创建轮子
      // 这种情况用于，第一次加载的时候
      if (!this.wheels || this.dirty) {
        this.$nextTick(() => {
          this.wheels = []
          let wheelWrapper = this.$refs.wheelWrapper
          this.pickerData.forEach((item, index) => {
            this._createWheel(wheelWrapper, index)
          })
          this.dirty = false
        })
      } else {
        // 当有轮子的时候，show 时，直接使 轮子 enable, 并让轮子滚到需要指定的位置
        this.pickerData.forEach((item, index) => {
          this.wheels[index].enable()
          this.wheels[index].wheelTo(this.pickerSelectedIndex[index])
          // todo
          this._wheelChange(0)
          this._wheelChange(1)
        })
      }
    },

    /**
     * hide the picker
     * 每个轮子都需要 disable
     */
    hide () {
      this.state = STATE_HIDE
      this.pickerData.forEach((item, index) => {
        this.wheels[index].disable()
      })
    },

    /**
     * 每次 dom 改变时，必须 refresh 下 wheel
     */
    refresh () {
      this.$nextTick(() => {
        this.wheels.forEach((wheel, index) => {
          wheel.refresh()
        })
      })
    }
  },
  watch: {
    value (newV) {
      this._setPickerValue()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./_bee-picker";

  .bee-date-picker {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;

    &.picker-fade-enter, &.picker-fade-leave-active {
      opacity: 0;
    }
    &.picker-fade-enter-active, &.picker-fade-leave-active {
      transition: all .3s ease-in-out;
    }

    .picker-panel {
      position: absolute;
      bottom: 0;
      width: 100%;

      &.picker-move-enter, &.picker-move-leave-active {
        transform: translate3d(0, 100%, 0);
      }
      &.picker-move-enter-active, &.picker-move-leave-active {
        transition: all .3s ease-in-out;
      }

      .picker-choose {
        justify-content: space-between;
      }

      .picker-content {
        position: relative;
        .mask-top, .mask-bottom {
          width: 100%;
          position: absolute;
          z-index: 9;
          pointer-events: none;
          transform: translateZ(0)
        }
        .mask-top {
          top: 0;
          background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
        }
        .mask-bottom {
          bottom: 0;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
        }
      }

      .wheel-wrapper {
        display: flex;
        .wheel {
          flex: 1;
          overflow: hidden;
          .wheel-scroll {
            padding: 0;
            // 缩下两个 item 单位
            list-style: none;
            .wheel-item {
              // background-color: red;
              list-style: none;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>
