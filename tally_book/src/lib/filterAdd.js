/*
*  sgin: 判断支出还是收入----'-' 或 '+'
*  condition: 筛选条件(哪一年哪月哪天)
*  arr: 记录的帐
*/
const filterAdd = function(sgin, condition, arr) {
  var sum = 0
  var myArr = arr.filter(item => item.date.indexOf(condition) >= 0)
  myArr = myArr.filter(item => item.type.indexOf(sgin) >= 0)

  if (myArr.length === 0) {
    return sum.toFixed(1)
  } else {
    for (let i = 0; i < myArr.length; i++) {
      sum += myArr[i].sum
    }
    return sum.toFixed(1)
  }
}

export default filterAdd
