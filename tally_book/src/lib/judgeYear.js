// 判断平年闰年，并且获取某个月具有的天数
const judgeYear = function(year, month) {
  var y = Number(year)
  var m = Number(month)
  var arr

  if ((y % 400 === 0) || ((y % 100 !== 0) && (y % 4 === 0))) {
    // 闰年
    arr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  } else {
    arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  }

  return arr[m - 1]
}

export default judgeYear
