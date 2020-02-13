/**
 * 等于计算值
 */

function calcEquals(realArr1) {

  var arr1 = realArr1; //输入屏幕缓存的值
  var arr = arr1.split('');
  var realArr = [];
  //上一个数字
  var preNum = "";
  //将多位数整合为一个数字
  for (var i in arr) {
    if (arr[i] == "+" || arr[i] == "-" || arr[i] == "*" || arr[i] == "/") {
      realArr.push(preNum);
      preNum = "";
      //最后一位运算符,去除
      if ((arr.length - 1) == Number(i)) {
        continue;
      }
      realArr.push(arr[i]);


    } else {
      preNum += arr[i];
      if ((arr.length - 1) == Number(i)) {
        realArr.push(preNum);
        preNum = "";
      }
    }
  }
  var numArr = [];
  var operArr = [];
  var operArr2 = [];
  /**
   * 数字分离
   */
  for (var i in realArr) {
    if (realArr[i] == "+" || realArr[i] == "-" || realArr[i] == "*" || realArr[i] == "/") {
      operArr.push(realArr[i]);  //运算符
      operArr2.push(realArr[i]);
    } else {
      numArr.push(Number(realArr[i]) * 1.0); //数字  
    }
  }

  /**
  * 乘除计算,并将结果赋值
  */
  var isSub = false;
  for (var i in operArr) {
    i = Number(i);
    if (operArr[i] == "*") {
      numArr[i + 1] = numArr[i] * numArr[i + 1];
      numArr[i] = 0;

      if (isSub) {
        operArr2[i] = "-";
      } else {
        operArr2[i] = "+";
      }

    } else if (operArr[i] == "/") {
      numArr[i + 1] = numArr[i] / numArr[i + 1];
      numArr[i] = 0;
      if (isSub) {
        operArr2[i] = "-";
      } else {
        operArr2[i] = "+";
      }
    } else if (operArr[i] == "-") {
      isSub = true;
    } else if (operArr[i] == "+") {
      isSub = false;
    }
  }

  /**
   *加减 计算
   */
  var result = Number(numArr[0]);
  for (var i in operArr2) {
    i = Number(i);
    if (operArr2[i] == "+") {
      result += Number(numArr[i + 1]);
    } else if (operArr2[i] == "-") {
      result -= Number(numArr[i + 1]);
    }
  }
  return result;
}



module.exports = {
  calcEquals: calcEquals
}
