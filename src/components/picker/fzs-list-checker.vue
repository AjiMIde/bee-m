<template>
  <transition name="picker-fade">
    <div class="fzs-list-checker" v-show="listShow" @click.self="onCancel">
      <transition name="picker-move">
        <div class="picker-panel" v-show="listShow">
          <div class="picker-choose flex-box">
            <span class="cancel flex-item-1" @click.self="onCancel">取消</span>
            <span class="search flex-item-5">
              <input type="text" placeholder="输入搜索..." v-model="searchVal">
              <span></span>
            </span>
          </div>

          <div class="picker-content">
            <div class="list">
              <ul>
                <li v-for="(item, index) in cData" :key="index" @click="onItemClick(item, index)"
                    :class="{'li-selected': item.text === cSelectedItem.text}">
                  <!--<div class="list-space"></div>-->
                  <div class="list-item"
                       :class="{'list-item-possible': item.possible === true, 'list-item-no-possible': item.possible === false}">
                    {{item.text}}
                  </div>
                  <div class="list-action">
                    <div class="list-choose-icon" :class="{'list-choose-icon-selected': item.selected}">
                      <svg class="fzs-pos-icon" aria-hidden="true">
                        <use xlink:href="#pay-ok"></use>
                      </svg>
                    </div>
                  </div>
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
// import BScroll from 'better-scroll'

const COMPONENT_NAME = 'listChecker'
const EVENT_SELECT = 'onSelect'
const EVENT_CANCEL = 'onCancel'
const EVENT_SHOW = 'onShow'

export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default () {
        return [] // [{text: '', value: ''}] 或 [1, 2, 3] 或['a', 'b', 'c']
      }
    },
    selectedIndex: {
      type: Number,
      default () {
        return -1
      }
    }
  },
  data () {
    return {
      scrollTop: 0,
      searchVal: '',
      searchMode: false,
      cData: [],
      cSelectedIndex: 0,
      cSelectedItem: {},
      listShow: false // true/false
    }
  },
  created () {
    window.lc = this
    this.cData = this.objDeepCopy(this.data)
    this.handleData()
    this.cSelectedIndex = this.selectedIndex
  },
  methods: {
    compatibleIOSPageScrollBug (fixed) {
      if (fixed) {
        this.scrollTop = document.scrollingElement.scrollTop
        window.document.body.style.top = -this.scrollTop + 'px'
        window.document.body.style.position = 'fixed'
      } else {
        window.document.body.style.top = 0 + 'px'
        window.document.body.style.position = 'relative'
        document.scrollingElement.scrollTop = this.scrollTop
      }
    },
    objDeepCopy (source) {
      let sourceCopy = source instanceof Array ? [] : {}
      for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? this.objDeepCopy(source[item]) : source[item]
      }
      return sourceCopy
    },
    handleData () {
      if (this.cData.length > 0 && (typeof this.cData[0] === 'string' || typeof this.cData[0] === 'number')) {
        this.cData = this.cData.map(item => {
          return { value: item, text: '' + item }
        })
      }
    },
    onItemClick (item, index) {
      this.cSelectedIndex = index
      this.cSelectedItem = item

      this.$emit(EVENT_SELECT, item, index)
      window.setTimeout(() => {
        this.onCancel()
      }, 500)
    },
    onCancel () {
      this.searchVal = ''
      this.listShow = false
      this.compatibleIOSPageScrollBug(false)
      this.$emit(EVENT_CANCEL)
    },
    show () {
      this.listShow = true
      this.compatibleIOSPageScrollBug(true)
      this.$emit(EVENT_SHOW)
    }
  },
  watch: {
    data (newData) {
      this.cData = this.objDeepCopy(newData)
      this.handleData()
    },
    searchVal (newV) {
      const aryA = []
      const aryB = []
      if (newV) {
        this.searchMode = true
        this.cData.forEach(item => {
          if (item.text.indexOf(newV) >= 0) {
            item.possible = true
            aryA.push(item)
          } else {
            item.possible = false
            aryB.push(item)
          }
          this.cData = aryA.concat(aryB)
        })
      } else {
        this.searchMode = false
        this.cData = this.objDeepCopy(this.data)
        this.handleData()
        // this.cData.forEach(item => {
        //   delete item.possible
        // })
      }
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

  $panel-h: 250 * 2px; /*px*/
  $panel-w: 85%; /*px*/
  $wheel-item-h: 36 * 2px; /*px*/

  @import "../../assets/fzs-pos-variable";
  .fzs-list-checker {
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
      z-index: 199;
      bottom: 0;
      width: $panel-w;
      height: 100%;
      background: $c-white;
      opacity: 1;
      &.picker-move-enter, &.picker-move-leave-active {
        transform: translate3d(-$panel-w, 0, 0); /*px*/
      }
      &.picker-move-enter-active, &.picker-move-leave-active {
        transition: all .3s ease-in-out;
      }
      .picker-choose {
        font-size: $fz-medium; /*px*/
        color: $c-grey;
        border-bottom: $border; /*px*/
        margin-top: 10*2px; /*px*/
        height: 33*2px; /*px*/
        .confirm, .cancel {
          color: $PrimaryColor;
          padding: 8*2px 12*2px; /*px*/
        }
        .search {
          text-align: left;
          color: $PrimaryColor;
          input {
            width: 100%;
            height: 100%;
            outline: none;
            border: 0;
            border-bottom: 2px solid $c-grey;
          }
        }
        .cancel {
          text-align: left;
          //color: $c-grey;
        }
      }

      .picker-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 43*2px; /*px*/
        bottom: 0;
        overflow: scroll;
        .list {
          ul {
            li {
              font-size: 13px*2; /*px*/
              padding: 14px*2 16px*2; /*px*/
              border-bottom: 2px solid #eeeeee; /*px*/
              display: flex;
              .list-action {
                display: flex;
                align-items: center;
              }
              .list-choose-icon, .list-space {
                width: 18*2px; /*px*/
                height: 18*2px; /*px*/
                line-height: 18*2*1.15px; /*px*/
              }
              .list-choose-icon {
                border-radius: 50%;
                border: 2px solid; /*px*/
                color: $c-grey;
                .fzs-pos-icon {
                  margin-right: 4px;
                  width: 11*2px; /*px*/
                  height: 11*2px; /*px*/
                  vertical-align: 2px; /*px*/
                }
                &-selected {
                  color: $PrimaryColor;
                  border-color: $PrimaryColor;
                }
              }
              .list-item {
                /*overflow: hidden;*/
                /*text-overflow: ellipsis;*/
                /*white-space: nowrap;*/
                padding: 0 10*2px; /*px*/
                flex: 1;
                &-possible {

                }
                &-no-possible {
                  font-size: 13*2px; /*px*/
                  color: $c-grey;
                }
              }
            }
            .li-selected {
              .list-item {
                color: $PrimaryColor;
              }
              .list-choose-icon {
                border-color: $PrimaryColor;
                color: $PrimaryColor;
              }
            }
          }
        }
      }
    }
  }
</style>
