/* pages/parent/parent.wxss */
var app = getApp()
var calcUtil = require('../../utils/clac_parent.js')
Page({
  data: {
    input_flag: false,//输入框是否禁用
    focus: false,     //输入框是否聚焦
    wel_come: "家长出题功能",
    
    localValue:'',    //暂存输入字符串的本地变量
    allValue:'',      //总字符串
    inputValue:'',    //用户输入的字符串
    operation: '',    //用户选择的运算符

    count:0,          //记录用户当前输入数字个数
    dig_num: 2,       //用户输入的数字最大个数，默认为2
    num_dig: 6,      //单个数字最大位数
    input_count:0,    //记录用户当前已上传题目的个数
    items: [          //radio选择运算个数，默认为2
      { name: '2', value: '2', checked: 'true' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
    ],
    inputs: [],      //保存用户提交的题目 name value answer
  },
  
  //实时获取input框中的输入值
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //radio发生变化，用户选择数字个数
  radioChange: function (e) {
    this.setData({
      dig_num: e.detail.value
    })
    
  },

  //点击加号时添加操作符并修改整体字符串
  add: function (e) {
    if (this.data.localValue == "+" || this.data.localValue == "-" || this.data.localValue == "*"
      || this.data.localValue == "/") return;//如果只有一个符号直接点击，则忽略
    if (this.data.count != this.data.dig_num && this.data.localValue != "")
      this.setData({
        operation: "+",
        allValue: this.data.allValue + this.data.localValue,
        count: this.data.count + 1
      })
    if (this.data.count == this.data.dig_num) this.setData({ input_flag: true, operation: '' });
  },
  //点击减号时添加操作符并修改整体字符串
  sub: function (e) {
    if (this.data.localValue == "+" || this.data.localValue == "-" || this.data.localValue == "*"
      || this.data.localValue == "/") return;//如果只有一个符号直接点击，则忽略
    if (this.data.count != this.data.dig_num && this.data.localValue != "")
      this.setData({
        operation: "-",
        allValue: this.data.allValue + this.data.localValue,
        count: this.data.count + 1
      })
    if (this.data.count == this.data.dig_num) this.setData({ input_flag: true, operation: '' });
  },
  //点击乘号时添加操作符并修改整体字符串
  mul: function (e) {
    if (this.data.localValue == "+" || this.data.localValue == "-" || this.data.localValue == "*"
      || this.data.localValue == "/") return;//如果只有一个符号直接点击，则忽略
    if (this.data.count != this.data.dig_num && this.data.localValue != "")
      this.setData({
        operation: "*",
        allValue: this.data.allValue + this.data.localValue,
        count: this.data.count + 1
      })
    if (this.data.count == this.data.dig_num) this.setData({ input_flag: true, operation: '' });
  },
  //点击除号时添加操作符并修改整体字符串
  div: function (e) {
    if (this.data.localValue == "+" || this.data.localValue == "-" || this.data.localValue == "*"
      || this.data.localValue == "/") return;//如果只有一个符号直接点击，则忽略
    if (this.data.count != this.data.dig_num && this.data.localValue!="")
      this.setData({
        operation: "/",
        allValue: this.data.allValue + this.data.localValue,
        count: this.data.count + 1
      })
    if (this.data.count == this.data.dig_num) this.setData({ input_flag: true, operation: ''});
  },
  //点击“键入”时取消操作符并维持整体字符串固定
  hand: function (e) {
    if (this.data.count == 0) return; //如果只有一个数，直接点击回车，则忽略
    if (this.data.localValue == "+" || this.data.localValue == "-" || this.data.localValue == "*" 
      || this.data.localValue == "/") return;//如果只有一个符号直接点击，则忽略
    // if (this.data.allValue && !this.data.operation) this.addItem()
    else{
      this.setData({
        allValue: this.data.allValue + this.data.localValue,
        count: this.data.count + 1
      })
      this.addItem()
    }
    if (this.data.count == this.data.dig_num) this.setData({ input_flag: true, operation: '' });
  },
  //点击添加题目时，将整体字符串添加到inputs数组列表中并显示
  addItem: function (e) {
    var var_Param1 = "inputs[" + String(this.data.input_count) + "].name"
    var var_Param2 = "inputs[" + String(this.data.input_count) + "].value"
    var var_Param3 = "inputs[" + String(this.data.input_count) + "].answer"
    var temp_ans = calcUtil.calcEquals(this.data.allValue)
    this.setData({
      [var_Param1]: this.data.input_count,
      [var_Param2]: this.data.allValue,
      [var_Param3]: temp_ans,
      operation: "",
      count: 0,
      input_flag: false,
      allValue: "",
      inputValue: '',
      input_count: this.data.input_count + 1
    })
    app.globalData.in_Put = this.data.inputs
    app.globalData.input_Count = this.data.input_count
    console.log(app.globalData.in_Put)
  },
//获取表单变化reset信号，加将input框中内容及时删除
  foo: function () {
    if (this.data.content) {
      //Do Something
      this.saveGMAMessage()
    } else {
      //Catch Error
    }
    this.data.localValue = this.data.operation + this.data.inputValue;
    this.data.inputValue = "";//将data的inputValue清空
  },
  removeItem: function() {
    if (this.data.input_count!=0){
      var id = this.data.input_count-1;
      var arr = this.data.inputs;
      arr.splice(id, 1);
      this.setData({
        inputs: arr,
        input_count: this.data.input_count - 1
      });
    }
  },
  // 返回首页
  backHome: function() {
    wx.navigateTo({
      url: '../index1/index1'
    })
  }
})
