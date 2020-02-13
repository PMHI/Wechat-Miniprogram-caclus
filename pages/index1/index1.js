var app = getApp()
const innerAudioContext = wx.createInnerAudioContext()

var _animation;
var _animationIndex;
var _loadImagePathIndex = 0;  //旋转数
var _animationIntervalId = "";

const _ANIMATION_TIME = 500;
Page({
  data: {
    animation: '',  //控制图片是否旋转
    ro_speed:30,  // 图片旋转速度 [0-360]

    userInfo: {},   //获取的用户信息
    disabled: false,    //控制按钮是否可用
    iconType: 'success',  //图标样式

    // innerAudioContext : wx.createInnerAudioContext(),
    music_src:"",//音乐资源地址
    music_picsrc:"", //音乐专辑封面地址
    music_able:0
  },
  //事件处理函数
  bindViewTap: function () { //选择查看说明页面跳转
    wx.navigateTo({
      url: '../instructions/instructions',
    })
  },
  toCalc1: function () {  //选择学生登录页面跳转
    this.stopAnimationInterval();//停止动画
    innerAudioContext.pause();
    //进入后声音关闭
    this.data.music_able = 0;
    app.globalData.music_able = 0;//将音乐状态赋值

    wx.switchTab({
      url: '/pages/setmine/setmine',
    })
  },
  toCalc2: function () {  //选择家长登录
    this.stopAnimationInterval();
    wx.navigateTo({
      url: '../parent/parent'
    })
  },

  onLoad: function () {
    //1、调用微信登录接口，获取code
    wx.login({
      success: function (r) {
        var code = r.code;//登录凭证
        if (code) {
          //2、调用获取用户信息接口
          //...

        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        callback(false)
      }
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })   
      app.globalData.userInfo = userInfo
    })
  },

  //控制声音播放
  onReady: function (e) {
    this.data.music_able = app.globalData.music_able;
    this.data.music_src = app.globalData.music_src;
    this.setData({
      music_picsrc: app.globalData.music_picsrc,
    })
    // 使用 wx.createInnerAudioContext 获取 audio 上下文 context
    innerAudioContext.src = this.data.music_src;
    innerAudioContext.volume = 0.5;
    innerAudioContext.loop = true;
    if (this.data.music_able) this.startAnimationInterval();
    if (this.data.music_able) {
      innerAudioContext.play()
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }
  },
  //控制声音播放/暂停按钮发生点击
  audio2P() {
    if (!this.data.music_able){
      this.startAnimationInterval();
      innerAudioContext.play();
      this.data.music_able = 1;
    }
    else{
      this.stopAnimationInterval();
      innerAudioContext.pause();
      this.data.music_able = 0;
    }
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    _loadImagePathIndex = 0;
    _animation = wx.createAnimation({
      duration: _ANIMATION_TIME,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,     //动画之间的延迟设为0
      transformOrigin: '50% 50% 0'
    })
    if (this.data.music_able) this.startAnimationInterval();
    if (this.data.music_able) {
      innerAudioContext.play()
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }
  },

  /* 实现image旋转动画，每次旋转 speed*n度 控制旋转速度  */
  rotateAni: function (n) {
    _animation.rotate(this.data.ro_speed * (n)).step()  //动画旋转一次并表明完成
    this.setData({
      animation: _animation.export()    //导出动画队列，并清掉之前的动画操作
    })
  },

  /**
    * 开始旋转 在onShow中调用
   */
  startAnimationInterval: function () {
    var that = this;
    that.rotateAni(++_loadImagePathIndex); // 进行一次旋转
    _animationIntervalId = setInterval(function () {
      that.rotateAni(++_loadImagePathIndex);
    }, _ANIMATION_TIME); // 没间隔_ANIMATION_TIME进行一次旋转
  },

  /**
    * 停止旋转
    */
  stopAnimationInterval: function () {
    if (_animationIntervalId > 0) {
      clearInterval(_animationIntervalId);
      _animationIntervalId = 0;
    }
  },

  onHide(){
    this.stopAnimationInterval();
    _animation.rotate(0).step();  //动画旋转一次并表明完成
    this.setData({
      animation: _animation.export()    //导出动画队列，并清掉之前的动画操作
    })
  }
})
