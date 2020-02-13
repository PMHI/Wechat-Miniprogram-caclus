// pages/setmine/setmine.js
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    turn_intro:"查看说明",
    turn_out: "返回主界面",
    userInfo:{},
    music_src: "", //音乐地址
    music_able: 0,
    music_ableinfo:"关闭",
  },

  intro: function () {
    wx.navigateTo({
      url: '../instructions_in/instructions_in',
    })
  },

  sign_out: function () {
    innerAudioContext.pause();
    app.globalData.music_able = this.data.music_able
    wx.navigateTo({
      url: '../index1/index1',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //控制声音播放
  onReady: function (e) {
    this.data.music_src = app.globalData.music_src,
    this.data.music_able = 0,
    this.setData({
      music_ableinfo : "关闭"
    })
    // 使用 wx.createInnerAudioContext 获取 audio 上下文 context
    innerAudioContext.src = this.data.music_src;
    innerAudioContext.volume = 0.7;
    innerAudioContext.loop = true;
  },
  //控制声音播放/暂停按钮发生点击
  audio2P: function () {
    if (!this.data.music_able) {
      innerAudioContext.play();
      this.data.music_able = 1;
      this.setData({
        music_ableinfo : "开启",
      })
    }
    else {
      innerAudioContext.pause();
      this.data.music_able = 0;
      this.setData({
        music_ableinfo : "关闭",
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.userInfo)
    console.log(app.globalData.userInfo)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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