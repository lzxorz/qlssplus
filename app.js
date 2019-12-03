//app.js
import './lib/wxPromise.min.js';
// console.log("wx.pro==> ", wx.pro);

App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (wx.getUpdateManager) {
      var o = wx.getUpdateManager();
      o.onCheckForUpdate(function (e) {
        console.log("需要更新", e.hasUpdate);
      }), o.onUpdateReady(function () {
        wx.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success: function (e) {
            e.confirm && o.applyUpdate();
          }
        });
      }), o.onUpdateFailed(function () { });
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("app onlaunch res ==> ", res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
                // this.userInfoReadyCallback(res)
              // }
            }
          })
        }
      }
    }),
      options && options.scene && 1044 == options.scene && options.shareTicket ? this.globalData.shareTicket = options.shareTicket : this.globalData.shareTicket = null,
      this.deviceProfile();
  },
  onShow: function (options) {
    options && options.scene && 1044 == options.scene && options.shareTicket ? this.globalData.shareTicket = options.shareTicket : this.globalData.shareTicket = null;
  },
  deviceProfile: function () {
    var e = {}, systemInfo = wx.getSystemInfoSync();
    e.model = systemInfo.model, this.globalData.isIpx = e.model && (e.model.includes("iPhone X") || e.model.includes("iPhone10,3") || e.model.includes("iPhone10,6") || e.model.includes("iPhone11,8") || e.model.includes("iPhone11,2") || e.model.includes("iPhone11,6") || e.model.includes("iPhone11,4")),
      e.wechatVersion = systemInfo.version, e.pixel = systemInfo.windowWidth + "*" + systemInfo.windowHeight, e.language = systemInfo.language,
      e.timezone = -new Date().getTimezoneOffset() / 60, e.system = systemInfo.system, Object.assign(this.globalData.deviceProfiles, e),
      wx.getNetworkType({
        success: o => {
          var a = o.networkType.toLocaleLowerCase();
          e.connectionType = "wifi" === a ? 0 : 1, e.cellularNetworkType = "wifi" !== a ? "4g" == a ? "LTE" : a : "OFFLINE",
            Object.assign(this.globalData.deviceProfiles, e);
        }
      });
  },

  globalData: {
    baseUrl: "https://",
    userInfo: null, // 授权后
    deviceProfiles: {}, // App启动后
    userId: "", // loginServer后
    userToken: "", // loginServer后
    hasLogin: !1, // loginServer后
    shareTicket: null, // 群聊中点击小程序卡片链接 进入 小程序
    openGid: '' // 群聊中点击小程序卡片链接 进入 小程序
  }
})