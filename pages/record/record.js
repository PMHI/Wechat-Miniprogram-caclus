// pages/record/record.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      err_exe:[],
      err_num:0,
  },
  clearItem: function () {
    if (this.data.err_num != 0) {
      this.setData({
        err_exe: "",
        err_num: 0
      });
    }
  },
  removeItem: function () {
    if (this.data.err_num != 0) {
      this.data.err_exe.pop();
      this.setData({
        err_exe: this.data.err_exe,
        err_num: this.data.err_num - 1
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      err_exe:app.globalData.err_Exe,
      err_num:app.globalData.err_Num
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.err_Num = this.data.err_num  //更新错题个数
    app.globalData.err_Exe = this.data.err_exe  //更新错题
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