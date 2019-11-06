export default {
  /**
   * 复制 Dom 内容
   * @param ele {element} element元素内容
   * @param successFun {function}
   * @param errFun {function}
   */
  copy (ele, successFun, errFun) {
    if (ele && ele.select && document.execCommand) {
      ele.select()
      if (ele.createTextRange && ele.execCommand) {
        ele.createTextRange()
        ele.execCommand('Copy')
      } else {
        document.execCommand('Copy')
      }
      successFun && typeof successFun === 'function' && successFun()
      console.info('select copied')
    } else if (window.clipboardData && window.clipboardData.setData) {
      window.clipboardData.setData('Text', this.tradeResult.tradeOrderId || '')
      successFun && typeof successFun === 'function' && successFun()
      console.info('clipboard copied')
    } else if (document.execCommand) {
      const range = document.createRange()
      range.selectNodeContents(ele)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      successFun && typeof successFun === 'function' && successFun()
      console.info('execCommand copied')
    } else {
      errFun && typeof errFun === 'function' && errFun()
      console.error('No copy function in your devices')
    }
  }
}
