export default {
  setFontSize () {
    const doc = window.document
    const docEl = doc.documentElement
    // const metaEl = doc.querySelector('meta[name="viewport"]')

    let width = docEl.getBoundingClientRect().width
    if (width > 540) {
      width = 540
    }
    const rem = width / 10
    docEl.style.fontSize = rem + 'px'
  },
  init () {
    this.setFontSize()

    window.addEventListener('resize', () => {
      this.setFontSize()
    }, false)
  }
}
