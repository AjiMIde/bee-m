import wx from './weixinJSBridge'

// 错误汇总：
// * 问题：ios分享设置的内容不生效（后台生成 wx config 失败）
// # 解决：去掉因ios上分享多出的 &isappinstalled=0 替换成空，并使用 url = url.replace(/&isappinstalled=0/, '') window.location.replace(url)

// * 问题：ios分享因产生历史记录导致页面参数错乱
// # 解决：解决产生历史记录而产生 ios 下边记录导航 bar 而使用户点击了前进后退产生了错误，可使用 window.location.replace解决
// # 解决：另外很多路由工具提供了 reDirect 或 relaunch 等API，原理大同小异

// * 问题：ios 提示 imgUrl is need
// # 解决：在官方的文档内，imgUrl 的配置是可以空的，但是在ios上不行。。所以给个默认图片

// * 问题：引入官方jsSkd
// # 解决：显而易见，要使用官方的分享功能，得引入官方的js api文件
// # 解决：http://res.wx.qq.com/open/js/jweixin-1.4.0.js/http://res2.wx.qq.com/open/js/jweixin-1.4.0.js （支持https）
// # 解决：但一般来讲，开发的项目都是使用 AMD/CMD 格式引入文件的，固可以将文件下载到本地
// # 解决：使用 import wx from '../libs/jweixin-1.4.0.js'

// 官方社区: https://developers.weixin.qq.com/community/develop/mixflow

export default {
  /**
   * 初使化微信 JSSDK 配置
   * @param wxConfig {debug/appId/timestamp/nonceStr/signature/jsApiList}
   * @returns {boolean}
   */
  init (wxConfig = {}) {
    // console.log(shareObj)
    // const link = window.location.origin + window.location.pathname + '#' + shareObj.link + '?agentId=' + agentId
    // window.alert(link)
    if (wx.config && wxConfig.appId) {
      const jsApiList = wxConfig.jsApiList || ['updateAppMessageShareData']
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，生产时候关闭
        // 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxConfig.appId + '',               // 必填，公众号的唯一标识
        timestamp: wxConfig.timestamp + '',       // 必填，生成签名的时间戳
        nonceStr: wxConfig.nonceStr + '',         // 必填，生成签名的随机串
        signature: wxConfig.signature + '',       // 必填，签名，见附录1
        jsApiList                                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      return true
    } else {
      console.error('wx 初使化配置失败：缺少参数')
      return false
    }
  },

  /**
   * 配置分享给朋友的 分享样式
   * @param shareObj {object} 分享配置
   * @returns {boolean}
   */
  updateAppMessageShareData (shareObj) {
    if (wx.ready && shareObj.link) {
      wx.ready(() => {
        const param = {
          title: shareObj.title || '',  // 分享标题
          desc: shareObj.desc || '',    // 分享描述
          link: shareObj.link,          // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareObj.imgUrl || '', // 分享图片，请使用服务器图片地址
          success: () => {
          }            // 设置成功
        }
        wx.updateAppMessageShareData(param)
      })
      return true
    } else {
      console.error('wx ready 失败，引入文件失败或缺少link参数')
      return false
    }
  },

  /**
   * 调用微信支付，此调用可不使用 init() 来初使化微信 js sdk 环境，也不需要引入 wx js bridge 文件
   *
   * @param data {object} {
   *    appId: 公众号名称，由商户传入, timeStamp: 时间戳，自1970年以来的秒数,
   *    nonceStr: 随机串, package: 诸如像：prepay_id=u802345jgfjsdfgsdg888, signType: 微信签名方式（如 MD5）
   *    paySign: 微信签名 }
   * @param successFun
   * @param cancelFun
   * @param errFun
   */
  wxPayRequest (data, successFun, cancelFun, errFun) {
    window.WeixinJSBridge && window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest', { ...data }, (res) => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          // 由于微信成功回调的不可靠性，需要单独做一个http方法轮询订单状态
          console.info('wechat pay success')
          successFun && typeof successFun === 'function' && successFun()
        } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          console.warn('wechat pay cancel')
          cancelFun && typeof cancelFun === 'function' && cancelFun()
        } else {
          console.error('wechat pay error')
          errFun && typeof errFun === 'function' && errFun()
        }
      })
  }

}
