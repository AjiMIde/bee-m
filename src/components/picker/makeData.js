function isLeapYear (year) {
  return (year % 100 !== 0 && year % 4 === 0) || (year % 400 === 0)
}

function getMaxDay (year, month) {
  year = parseFloat(year)
  month = parseFloat(month)
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  }
  return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31
}

// 这个私有函数提供给 getHours/getMinutes/getSeconds使用
// 为了快速方便地构建数组
function _getComputeData (n = 0) {
  let rs = []
  let i = 0
  while (i < n) {
    i = ('' + i).length === 2 ? '' + i : '0' + i
    rs.push({ text: '' + i, value: '' + i })
    i++
  }
  return rs
}

function getYears (startY = 2014, endY) {
  if (!!endY === false) {
    endY = (new Date()).getFullYear()
  }

  startY = parseInt(startY)
  endY = parseInt(endY)

  let rs = []
  while (startY <= endY) {
    rs.push({ text: '' + startY, value: '' + startY })
    startY++
  }

  return rs
}

function getMonths (y = 2014) {
  let sM = 1
  let eM = 12

  y = parseInt(y)

  /* 这一段本来是判断，当日期是今年时，月份则返回是 今年已达到 最大月份
  因为太 date-picker 太复杂的了，所以暂时去掉
  let nowDate = new Date()
  let nowYear = nowDate.getFullYear()
  let nowMonth = nowDate.getMonth() + 1
  if (y === nowYear) {
    eM = nowMonth
  }
  */

  let rs = []
  while (sM <= eM) {
    sM = ('' + sM).length === 2 ? sM : '0' + sM
    rs.push({ text: '' + sM, value: '' + sM })
    sM++
  }

  return rs
}

function getDays (y = 2014, m = 1) {
  let s = 1
  let e = getMaxDay(y, m)

  y = parseInt(y)
  m = parseInt(m)

  let rs = []
  while (s <= e) {
    s = ('' + s).length === 2 ? s : '0' + s
    rs.push({ text: '' + s, value: '' + s })
    s++
  }

  return rs
}

function getHours () {
  return _getComputeData(24)
}

function getMinutes () {
  return _getComputeData(60)
}

function getSeconds () {
  return _getComputeData(60)
}

export {
  getYears,
  getMonths,
  getDays,
  getHours,
  getMinutes,
  getSeconds
}
