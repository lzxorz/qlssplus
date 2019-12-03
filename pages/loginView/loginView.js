var util = require("../../utils/util"), auth = require("../../utils/auth");
const app = getApp();

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(e) {},
  onReady: function() {},
  cancelLogin: function() {
      this.page.setData({
          hide: !0
      });
  },
  getUserLoginInfo: function(e) {
    util.showLoading("登录中");
    //用户按了允许授权按钮
    if (e.detail.userInfo) {
      // 获取到用户的信息了，打印到控制台上看下
      console.log("auth success", e.detail.userInfo);
      app.globalData.userInfo = e.detail.userInfo;
      // 登录到开发者服务器
      auth.loginServer();
      util.hideLoading(), util.showToastSuccess("登录成功"), util.navigateBack();
    } else {
      util.hideLoading(), console.log("auth reject...");
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法使用此功能，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
});