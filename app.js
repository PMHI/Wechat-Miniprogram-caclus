App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // wx.getSetting({
    //   success:function(res){
    //     console.log(res.authSetting)
    //   }
    // })
  },
    
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null,

    opr_Num: 2,  //操作数个数
    opr_Dig: 1,  //操作数位数

    cho_Mod: 0,  //选择的模式 0为填数字，1为填操作符

    exercise_Num:1,  //学生选择的题目数量
    input_Count: 0,  //家长上传的题目数量

    exe_Auto:0, //是否自动出题
    able_Add: 1,//是否允许加法 1允许
    able_Sub: 1,//是否允许减法
    able_Mul: 1,//是否允许乘法
    able_Div: 1,//是否允许除法

    in_Put: [],//储存家长出的题目
    err_Exe: [],//储存错题
    err_Num:0,//储存错题个数

    music_src: "cloud://exesmaker-1xvvd.6578-exesmaker-1xvvd-1300467762/music1.mp3",//音乐资源地址
    music_picsrc: "cloud://exesmaker-1xvvd.6578-exesmaker-1xvvd-1300467762/music_pic1.jpg", //音乐专辑封面地址
    music_able:0 //是否播放音乐，默认为1播放
  }
})
