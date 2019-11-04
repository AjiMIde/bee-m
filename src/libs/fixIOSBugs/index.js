export default {
  /**
   * 解决当显示一个 mask pop，就是一个遮罩的时候，然后在此遮罩上滚动时
   * 防止底下的 div 等元素发生滚动的问题，因为底下一滚动，就容易在ios上发生问题
   * @param fixed {boolean}，当你的 mask遮罩显示时，就调用这个(true)，隐藏时，就用(false)
   */
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

  /**
   * 与上一个解决问题遮罩一致是：当你在显示一个遮罩（当伴随着一个input框）时，此时输入内容的时候
   * 虚拟小键盘会顶起你的遮罩，然后就会伴随着各种问题。解决的思路是，设定 input 的blur事件
   * 当 blur之后 ，将整个页面进行一次scroll，这样就能规避问题
   * 这个方法如何使用呢，只需要在页面加载时，使用一次即可
   * @param eles {document} 传入元素，此方法会自动寻找元素下面的input
   */
  compatibleIOSWechatSetDomEleBlur (eles) {
    const fun = function (input) {
      input.onblur = function () {
        window.setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
          window.scrollTo(0, Math.max(scrollHeight - 1, 0))
        }, 100)
      }
      // 我们发现，在一些ios上，input 似乎很难被 focus到
      input.onclick = function () {
        input.focus()
      }
    }

    if (eles.nodeName === 'INPUT') {
      fun(eles)
    } else {
      let inputs = eles.getElementsByTagName('input')
      if (inputs && inputs.length > 0) {
        for (let i = 0; i < inputs.length; i++) {
          fun(inputs[i])
        }
      }
    }
  }
}
