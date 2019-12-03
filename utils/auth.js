require("./util");

var e = getApp();

module.exports = {
  getShareTiket: function (cb) {
    let that = this
    // 展示本地存储能力
    if (that.globalData.shareTicket) {
      wx.getShareInfo({
        shareTicket: that.globalData.shareTicket,
        success: function (res) {
          console.log('getShareTiket---shareTicket-->' + JSON.stringify(res))
          let js_encryptedData = res.encryptedData
          let js_iv = res.iv
          wx.login({
            success: function (res) {
              let js_code = res.code
              console.log('code-->' + js_code)
              wx.request({
                url: 'xxxxxxxx',
                method: 'POST',
                data: {
                  code: js_code,
                  appId: 'xxxxx',
                  encryptedData: js_encryptedData,
                  iv: js_iv
                },
                success: function (res) {
                  that.globalData.openGid = res.data.openGId
                  console.log('getShareTiket---openGid' + that.globalData.openGid)
                  typeof cb == "function" && cb(that.globalData)
                },
                fail: function (err) {
                  console.log('getShareTiket---err' + JSON.stringify(err))
                }
              })
            }
          })
        }
      })
    } else {
      console.log('不存在shareTicket')
    }
  },
  loginServer: function () {
    wx.login({
      success: function (e) {
        var o = e.code;
        console.log("loginServer code ", o);
      }
    });
  },
  checkSession: function () {
    wx.checkSession({
      success: function () {
        console.log("session，没有过期");
      },
      fail: function () {
        wx.login({
          success: function (e) {
            var o = e.code;
            console.log("checkSession code ", o);
          }
        });
      }
    });
  },
  checkAuth: function () {
    var o = this;
    if (e.globalData.userInfo) return e.globalData.hasLogin || this.loginServer(), !0;
    wx.getSetting({
      success: function (n) {
        n.authSetting["scope.userInfo"] ? wx.getUserInfo({
          success: function (n) {
            return e.globalData.userInfo = n.userInfo, o.loginServer(), !0;
          }
        }) : setTimeout(function () {
          wx.navigateTo({
            url: "/pages/loginView/loginView"
          });
        }, 500);
      },
      fail: function (e) {
        console.error("获取Setting信息失败");
      }
    });
  }
};