var app = getApp()
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getUserInfo: function (e) {
    console.log(5);
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.navigateTo({
        url: '../index1/index1'
      })
    } else {
      this.openSetting();
    }
  },

  login: function () {
    console.log(111)
    var that = this
    var thist = this;
    // if (typeof success == "function") {
    //   console.log(6);
    //   console.log('success');
    //   this.data.getUserInfoSuccess = success
    // }
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code);
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            wx.request({
              url: app.server.hostUrl + '/api/auth/login_by_weixin.do',//自己的服务接口地址,这里是去拿到code去后台进行业务处理，调用微信接口拿到用户openid和凭证，在解密拿到用户数据
              method: 'post',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
              success: function (data) {
                wx.setStorage({
                  key: "userif",
                  data: data.data.userinfo
                })
                console.info(data);
                //4.解密成功后 获取自己服务器返回的结果
                if (data.data.code == 1) {
                  var userInfo_ = data.data.userinfo;
                  console.log(7);
                  app.globalData.userInfo = userInfo_
                  that.setData({
                    getUserInfoFail: false,
                    userInf: userInfo_,
                    hasUserInfo: true

                  })
                  thist.setData({
                    datas: userInfo_,
                    index: 1
                  })
                  console.log(userInfo_)
                  that.onLoad();
                } else {
                  console.log('解密失败')
                }

              },
              fail: function () {
                console.log('系统错误')
              }
            })

            //平台登录
          },
          fail: function (res) {
            console.log(8);
            console.log(res);
            that.setData({
              getUserInfoFail: true
            })
          }
        })
      }
    })
  },
  //跳转设置页面授权
  openSetting: function () {
    var that = this
    if (wx.openSetting) {
      wx.openSetting({
        success: function (res) {
          console.log(9);
          //尝试再次登录
          that.login()
        }
      })
    } else {
      console.log(10);
      wx.showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
      })
    }
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