/* pages/parent/parent.wxss */
const app=getApp()
Page({
  data: {
    opr_num: 0,  //操作数个数

    opr_dig: 1,  //操作数位数
    dig_max: 6,  //操作数最大位数
    dig_min: 1,   //操作数最小位数

    exercise_num: 1,//题数
    exercise_max: 20,//最大题数
    exercise_min: 1,//最小题数

    mods: [   //radio选择模式，0为填数字，1为填操作符，默认为数字
      { name: '填数字', value: '0', checked: 'true' },
      { name: '填操作符号', value: '1' },
    ],
    wel_come:"设置单人练习难度",
    items: [          //radio选择运算个数，默认为2
      { name: '2', value: '2', checked: 'true' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
    ],
    opr_spes: [        //操作数种类
      { name: '+', value: '1', checked: 'true'},
      { name: '-', value: '2', checked: 'true'},
      { name: '*', value: '3', checked: 'true'},
      { name: '/', value: '4', checked: 'true'},
    ],  
  },

  switch_Changed:function(e){
    if(e.detail.value) app.globalData.exe_Auto = 1;
    else app.globalData.exe_Auto = 0;
  },

  radioChange_mod: function (e) {
    app.globalData.cho_Mod = e.detail.value;
  },

  //radio发生变化，用户选择数字个数
  radioChange_num: function (e) {
    this.setData({
      opr_num: e.detail.value
    })
    app.globalData.opr_Num = this.data.opr_num;
  },

  slider1change: function (e) {
    this.setData({
      exercise_num: e.detail.value
    })
    app.globalData.exercise_Num = this.data.exercise_num;
  },

  slider2change: function (e) {
    this.setData({
      opr_dig: e.detail.value
    })
    app.globalData.opr_Dig = this.data.opr_dig;
  },

  checkboxChange_num: function(e){
    console.log(e)
    app.globalData.able_Add = 0;
    app.globalData.able_Sub = 0;
    app.globalData.able_Mul = 0;
    app.globalData.able_Div = 0;
    e.detail.value.map((item1,key1) => {
      if (item1 == 1) app.globalData.able_Add = 1;
      else if (item1 == 2) app.globalData.able_Sub = 1;
      else if (item1 == 3) app.globalData.able_Mul = 1;
      else app.globalData.able_Div = 1;
    })
  }
})
