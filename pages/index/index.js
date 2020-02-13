// pages/index/index.js
const app = getApp()

var calcUtil = require('../../utils/clac_parent.js')
Page({
  data: {
    disable:false, //控制按钮是否可点
    // 输入区
    inputValue:"",
    inputs:[],   
    //家长上传
    input_num: 0,  //题目数量
    exes:[""],      // 题目
    //学生自选
    opr_num:2,  //操作数个数
    opr_dig:1,  //操作数位数
                //题目数量沿用input_num
    //答题结果区
    right_rate: 100,   //正确率
    right_num: 0,    //正确个数
    err_num: 0,    //出错个数
    err_inputs: [""], // 错题题号
    err_exe: [""], // 错题
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // 实时获取键盘输入

  bindKeyInput: function (e) {
    console.log(e)
    var var_Param1 = "inputs[" + String(e.currentTarget.id) + "].name"
    var var_Param2 = "exes[" + e.currentTarget.id + "].input_value"
    this.setData({
      inputValue: e.detail.value,
      [var_Param1]: e.currentTarget.id,
      [var_Param2]: e.detail.vaule,
    })
    this.data.inputs[e.currentTarget.id].value = e.detail.value
    
  },

  // 提交答案
  hand_ans: function(e){
    var replaceArray = [];
    this.data.err_num = 0;
    this.data.err_inputs = []   //清空当前错误题号
    this.data.right_rate = 100;
    var flag = 0; //判断是否有非法字符
    for (var i = 0; i < this.data.input_num; i++) {
      for (let j = 0; j < this.data.inputs[i].value.length; ++j) {//正则判断是否合法
        var textValue = (/^[0-9_.+-]$/.test(this.data.inputs[i].value.charAt(j)));
        if (!textValue) {
          wx.showToast({
            title: '只能输入数字，小数点和加减号,且不能空题',
            icon: 'none'
          })
          flag = 1;
          break;
        }
      }
    }
    if(!flag){
      for (var i = 0; i < this.data.input_num; i++) {
        if (this.data.inputs[i].value != this.data.exes[i].answer) {
          this.data.err_num = this.data.err_num + 1;
          this.data.err_inputs.push(String(i + 1))
          this.data.err_exe.push(this.data.exes[i].value + "=" + this.data.exes[i].answer)
        }
      }
      this.data.right_rate = (1 - Number(this.data.err_num) / Number(this.data.input_num)) * 100
      this.data.right_num = this.data.input_num - this.data.err_num
      this.setData({
        err_inputs: this.data.err_inputs,    //显示当前错误题号
        right_rate: this.data.right_rate,
        err_num: this.data.err_num,
        right_num: this.data.right_num
      })
      //将错题数目加上
      app.globalData.err_Num = this.data.err_num + app.globalData.err_Num
      this.onShow()
    }
  },

  foo: function () {

  },

  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.err_exe = app.globalData.err_Exe;
    //自动出题控制
    this.setData({ //加载页面重新
      exes: []
    })
    if (!app.globalData.exe_Auto) {   //家长出题
      var param
      this.data.input_num =  app.globalData.input_Count;
      this.setData({
        exes: app.globalData.in_Put,
      })
      for (var i = 0; i < this.data.input_num; i++) {
        var param1 = "inputs[" + String(i) + "].value"
        this.setData({
          [param1]: "x"
        })
      }
    }
    else{     //自动出题
      //获取全局设置的值
      //当有操作数时才出题
      if (app.globalData.able_Add || app.globalData.able_Sub || app.globalData.able_Mul || app.globalData.able_Div) {
        this.data.input_num = app.globalData.exercise_Num; //题目个数
        this.data.opr_num = app.globalData.opr_Num; //操作数个数
        this.setData({
          opr_dig: app.globalData.opr_Dig, //操作数位数
        })

        for (var i = 0; i < this.data.input_num; i++) {
          var param1 = "inputs[" + String(i) + "].value"
          this.setData({
            [param1]: "x"
          })
        }
        
        if (!app.globalData.cho_Mod) this.exe_Number();
        else this.exe_Opr();
      }
    }
  },
  //数字模式出题
  exe_Number: function(){
    var _Param1
    var oprflag //操作数骰子
    var numnum = Number(app.globalData.exercise_Num)
    var oprnum = Number(app.globalData.opr_Num)
    var dig = Number(app.globalData.opr_Dig)
    var oprs = []
    for(var i = 0;i < numnum; ++i){
      //先生成第一个数并添加到题目中
      var paramnum = Math.floor(Math.random() * Math.pow(10, dig))
      var totalExe = String(paramnum)
      for(var j = 0;j < oprnum - 1; ++j){ //生成n-1个数和操作数并添加到题目中
        _Param1 = String(Math.floor(Math.random()*Math.pow(10,dig)))//向下取整，得到[0,10^this.data.opr_Dig)的数字
        oprflag = -1
        while(oprflag==-1){
          oprflag = Math.floor(Math.random() * 4)//0为+ 1为- 2为* 3为除 且被允许才生成
          if (!oprflag && app.globalData.able_Add) totalExe = totalExe + "+" + _Param1
          else if (oprflag == 1 && app.globalData.able_Sub) totalExe = totalExe + "-" + _Param1
          else if (oprflag == 2 && app.globalData.able_Mul) totalExe = totalExe + "*" + _Param1
          else if (oprflag == 3 && app.globalData.able_Div) {   //  分母不为0
            while (!Number(_Param1)) _Param1 = String(Math.floor(Math.random() * Math.pow(10, dig)))
            totalExe = totalExe + "/" + _Param1
          }
          else oprflag = -1
        }
      }
      var temp_ans = Math.floor(calcUtil.calcEquals(totalExe)) //放入计算并返回答案整数部分
      var var_Param1 = "exes[" + String(i) + "].value"
      var var_Param2 = "exes[" + String(i) + "].answer"
      var var_Param3 = "exes[" + String(i) + "].name"
      this.setData({
        [var_Param1]: totalExe,
        [var_Param2]: temp_ans,
        [var_Param3]: i,
      })
    }
  },
  //操作符模式出题
  exe_Opr: function(){
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //将错题传出
    app.globalData.err_Exe = this.data.err_exe
    var param
    this.setData({
      right_rate: 100,
      err_num: 0,
      err_inputs: []
    })
    for(var i = 0;i<this.data.input_num;i++){
      param = "exes[" + String(i) + "].input_value"
      this.setData({
        [param] : ""
      })
    }
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})