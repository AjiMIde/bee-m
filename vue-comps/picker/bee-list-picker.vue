<template>
  <transition name="picker-fade">
    <div class="bee-picker bee-list-picker" v-show="state===1" @touchmove.prevent @click="cancel">
      <transition name="picker-move">
        <div class="picker-panel" v-show="state===1" @click.stop>

          <div class="picker-choose bee-fb">
            <span class="cancel flex-item-1" @click="cancel">取消</span>
            <span class="confirm flex-item-1" :class="{'scrolling': scrolling}" @click="confirm">确认</span>
          </div>

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
// todo 写一个 test-fzs-list-picker 06-11 11:55
// todo 添加一个 mask 样式
import BScroll from 'better-scroll'

const STATE_HIDE = 0
const STATE_SHOW = 1
const COMPONENT_NAME = 'picker'
const EVENT_SELECT = 'select'
const EVENT_VALUE_CHANGE = 'valuechange'
const EVENT_CANCEL = 'cancel'
const EVENT_CHANGE = 'change'
export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default () {
        // 当只需要一个列时，定义 [[1, 2, 3]]，多个列时，定义多个数组：[[1, 2], [1, 2, 3]]
        // 可以是[[1, 2, 3]]，也可以是 [[{text: 1, value: 1}]]，当然最后会转换成后面的格式
        return []
      }
    },
    selectedIndex: {
      type: Array,
      default () {
        return [] // 当有多个列时，需要定义多个默认选中的 index，如 [1, 2, 3]
      }
    },
    value: {
      type: Boolean,
      default: false
    }
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
      pickerSelectedText: []
    }
  },
  created () {
    this.pickerData = this._handleData(this.data)
    this._setSelectedIndex()
  },
  methods: {
    _handleData (data) {
      data = data || this.data
      let newData = []

      if (data && data.length > 0 && data[0] && data[0].length > 0) {
        newData = data.map(item => {
          if (item.length > 0 && typeof item[0] !== 'object') {
            item = item.map(subItem => {
              return { text: subItem, value: subItem }
            })
          }
          return item
        })
      }
      return newData
    },

    //
    // 初使化 selected index 的值
    // 如果没有传参，则默认都为 0
    //
    _setSelectedIndex () {
      if (this.pickerSelectedIndex.length === 0) {
        this.pickerSelectedIndex = []
        for (let i = 0; i < this.pickerData.length; i++) {
          this.pickerSelectedIndex[i] = 0
        }
      }
    },

    //
    // 建造可滚动的轮子
    //
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

    // confirm 数据
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

      // 如果现值与原值相同，则还是 select 事件
      // 如果不同，都是 value-change 事件
      this.$emit(EVENT_SELECT, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
      if (changed) {
        this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
      }
    },

    // 取消
    cancel () {
      this.hide()
      this.$emit(EVENT_CANCEL)
    },

    // 显示
    show () {
      if (this.state === STATE_SHOW) {
        return
      }
      // aji
      this.pickerSelectedIndex = this.selectedIndex

      this.state = STATE_SHOW
      // 当没有轮子的时候，创建轮子
      // 这种情况用于，第一次加载的时候
      if (!this.wheels || this.dirty) {
        this.$nextTick(() => {
          this.wheels = []
          let wheelWrapper = this.$refs.wheelWrapper
          for (let i = 0; i < this.pickerData.length; i++) {
            this._createWheel(wheelWrapper, i)
          }
          this.dirty = false
        })
      } else {
        // 当有轮子的时候，show 时，直接使 轮子 enable, 并让轮子滚到需要指定的位置
        for (let i = 0; i < this.pickerData.length; i++) {
          this.wheels[i].enable()
          this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
        }
      }
    },

    /**
     * hide the picker
     * 每个轮子都需要 disable
     */
    hide () {
      this.state = STATE_HIDE
      for (let i = 0; i < this.pickerData.length; i++) {
        this.wheels[i].disable()
      }
    },

    // 设置值，一般用于值的更新
    setData (data) {
      this.pickerData = data.slice()
      this.dirty = true
    },

    // 设置选择的下标
    setSelectedIndex (index) {
      this.pickerSelectedIndex = index
    },

    // ?
    refill (datas) {
      let ret = []
      if (datas.length === 0) {
        return ret
      }
      datas.forEach((data, index) => {
        ret[index] = this.refillColumn(index, data)
      })
      return ret
    },

    //
    refillColumn (index, data) {
      if (this.state !== STATE_SHOW) {
        console.error('can not use refillColumn when picker is not show')
        return
      }
      const wheelWrapper = this.$refs.wheelWrapper
      let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
      let wheel = this.wheels[index]
      if (scroll && wheel) {
        let oldData = this.pickerData[index]
        this.$set(this.pickerData, index, data)
        let selectedIndex = wheel.getSelectedIndex()
        let dist = 0
        if (oldData.length) {
          let oldValue = oldData[selectedIndex].value
          for (let i = 0; i < data.length; i++) {
            if (data[i].value === oldValue) {
              dist = i
              break
            }
          }
        }
        this.pickerSelectedIndex[index] = dist
        this.$nextTick(() => {
          // recreate wheel so that the wrapperHeight will be correct.
          wheel = this._createWheel(wheelWrapper, index)
          wheel.wheelTo(dist)
        })
        return dist
      }
    },
    scrollTo (index, dist) {
      const wheel = this.wheels[index]
      this.pickerSelectedIndex[index] = dist
      wheel.wheelTo(dist)
    },
    refresh () {
      this.$nextTick(() => {
        this.wheels.forEach((wheel, index) => {
          wheel.refresh()
        })
      })
    }
  },
  watch: {
    data (newData) {
      this.setData(this._handleData(newData))
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./_bee-picker";

  .bee-list-picker {
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
        transform: translate3d(0, 250px, 0);
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
          z-index: 9;
          width: 100%;
          position: absolute;
          pointer-events: none;
          transform: translateZ(0);
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
