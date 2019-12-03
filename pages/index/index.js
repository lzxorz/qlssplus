//index.js
var util = require('../../utils/util'), auth = require('../../utils/auth');
//获取应用实例
const app = getApp();

Page({
  data: {
    isShowChoice: !1,
    openGid:null,
    postListData: {records:[]}
  },
  onLoad: function () {
    let that = this
    wx.showShareMenu({
      withShareTicket: true
    })
    auth.getShareTiket(function (res) {
      console.log('ShareTiket解密后==>' + JSON.stringify(res))
      that.setData({
        openGid: res.openGid
      })
    })
  },
  onReady: function () {
    console.log("初次渲染完成");
  },
  onUnload: function (e) {
    console.log("页面卸载");
  },
  onPullDownRefresh: function (e) {
    console.log("用户下拉动作");
  },
  onShareAppMessage: function () {
    console.log("用户点击右上角分享");
  },
  onShow: function (e) {
    console.log("页面显示");
  },
  onHide: function () {
    console.log("页面隐藏");
  },
  onUnload: function () {
    console.log("页面卸载");
  },
  onPullDownRefresh: function () {
    console.log("下拉动作");
  },
  onReachBottom: function () {
    console.log("上拉触底");
  },
  onShareAppMessage: function (res) {
    console.log("用户点击右上角分享");
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/index/index?id=123'
    }
  },
  //事件处理函数
  viewGridDetail: function (event) {
    util.showToast(event.target.dataset.url);
    if ("moreFeatures" == event.target.dataset.url)
      util.navigateOrRedirectToPage("/pages/index/moreFeatures/moreFeatures");
  },
  publishButtonTap: function(e) {
    if (auth.checkAuth()) {
      console.log("checkAuth success");
    }
    var t = wx.createAnimation({
      duration: 150,
      timingFunction: "ease"
    });
    t.rotate(90).step(), this.setData({
      _animation: t.export()
    });
    this.setData({
      isShowChoice: !0
    });
    
  },
  hideShade: function (e) {
    var t = wx.createAnimation({
      duration: 150,
      timingFunction: "ease"
    });
    t.rotate(0).step(), this.setData({
      _animation: t.export(),
      isShowChoice: !1
    });
  },
  handlePublish: function (e) {
    return void util.showToast(e.target.dataset.url);
    this.setData({
      isShowChoice: !0
    });
  }
});
