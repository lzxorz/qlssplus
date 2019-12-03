var
g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
  return typeof e;
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
},
m = "function" == typeof Symbol && "symbol" === g(Symbol.iterator) ? function (e) {
  return void 0 === e ? "undefined" : g(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : g(e);
},
isEmpty = function (e) {
  return !e || ("string" == typeof e && "" === e || ("object" === (void 0 === e ? "undefined" : m(e)) && 0 === Object.keys(e).length || !(!e.length || 0 !== e.length)));
},
notEmpty = function (e) {
  return !isEmpty(e);
};

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
};


Array.prototype.insert = function (e, t) {
  this.splice(e, 0, t);
}, Array.prototype.contains = function (e) {
  for (var t = 0; t < this.length; t++) {
    var r = this[t];
    if ((void 0 === r ? "undefined" : m(r)) === (void 0 === e ? "undefined" : m(e)) && r === e) return t;
  }
  return -1;
}, Array.prototype._contains = function (e) {
  return this.indexOf(e) >= 0;
}, Array.prototype.indexOf = function (e) {
  for (var t = 0; t < this.length; t++) {
    var r = this[t];
    if ((void 0 === r ? "undefined" : m(r)) === (void 0 === e ? "undefined" : m(e)) && r === e) return t;
  }
  return -1;
}, Array.prototype.remove = function (e) {
  for (var t = this.length - 1; t >= 0; t--) if (this[t] === e) {
    this.splice(t, 1);
    break;
  }
}, Array.prototype.removeAt = function (e) {
  this.splice(e, 1);
}, Array.prototype.removeAll = function (e) {
  for (var t = this.length - 1; t >= 0; t--) this[t] === e && this.splice(t, 1);
}, Array.prototype.isEmpty = function () {
  return 0 === this.length;
}, Array.prototype.notEmpty = function () {
  return this.length > 0;
}, Array.prototype.first = function () {
  return this[0];
}, Array.prototype.last = function () {
  if (0 !== this.length) return this[this.length - 1];
}, 
String.prototype.hasPrefix = function (e) {
  return 0 === this.indexOf(e);
}, 
Date.present = function () {
  return new Date();
}, Date.prototype.getTimestamp = function () {
  return Date.parse(this + "");
}, Date.oneDay = 864e5, Date.prototype.toFormatString = function (e) {
  var t = this.getFullYear(), r = this.getMonth() + 1, n = this.getDate(), o = this.getHours(), i = this.getMinutes(), a = this.getSeconds();
  return r < 10 && (r = "0" + r), n < 10 && (n = "0" + n), o < 10 && (o = "0" + o),
    i < 10 && (i = "0" + i), a < 10 && (a = "0" + a), "yyyy-mm-dd" === e ? t + "-" + r + "-" + n : t + "-" + r + "-" + n + " " + o + ":" + i + ":" + a;
}, Date.copy = function (e) {
  var t = e.getTime(), r = new Date();
  return r.setTime(t), r;
}, Date.prototype.hasPassed = function () {
  var e = this.getTime();
  return new Date().getTime() > e;
}, Date.prototype.toRoundString = function () {
  var e = Date.copy(this);
  return e.setHours(0, 0, 0, 0), e.toFormatString("yyyy-mm-dd");
}, Date.prototype.toRound = function () {
  return this.setHours(0, 0, 0, 0), this;
}, Date.prototype.whatIsTheDay = function () {
  var e = new Date().getDay();
  return 0 === e && (e = 7), e;
}, Date.prototype.whatIsTheDate = function () {
  return new Date().getDate();
}, Date.prototype.pass = function (e) {
  var t = this.getTime();
  return new Date(t + e * Date.oneDay);
}, Date.prototype.tomorrow = function () {
  return this.pass(1);
}, Date.prototype.yesterday = function () {
  return this.pass(-1);
}, Date.tomorrow = Date.present().tomorrow(), Date.yesterday = Date.present().yesterday(),
  Date.r_today = Date.present().toRound(), Date.r_tomorrow = Date.tomorrow.toRound(),
  Date.r_tomorrow = Date.yesterday.toRound(), Date.r_todayString = Date.present().toRoundString(),
  Date.r_tomorrowString = Date.tomorrow.toRoundString(), Date.r_yesterdayString = Date.yesterday.toRoundString(),
  Date.getNowTime = function () {
    return new Date().toISOString().substr(0, 10);
  };


module.exports = {
  test: function () {
    setTimeout(function () {
      console.log("hello world");
    }, 1e3);
  },
  formatTime: formatTime, numConverter: function (e, t) {
    return e ? ((e = parseInt(e, 10)) > 1e4 && (e = (e / 1e4).toFixed(1) + (t || "")),
      e) : 0;
  },
  timeDecoder: function (e) {
    var t, n = new Date(e).getTime(), o = (new Date().getTime() - n) / 1e3;
    if (o < 172800 && o > 86400) t = "昨天"; else if (o < 86400 && o > 3600) t = Math.round(o / 3600) + "小时前"; else if (o < 3600 && o > 60) t = Math.round(o / 60) + "分钟前"; else if (o < 60 && o >= -60) t = "刚刚"; else {
      var r = new Date(n), i = r.getFullYear(), a = r.getMonth() + 1, s = r.getDate();
      a < 10 && (a = "0" + a), s < 10 && (s = "0" + s), t = i + "-" + a + "-" + s;
    }
    return t;
  },

  setNavigationBarTitle: function (e) {
    wx.setNavigationBarTitle({
      title: e
    });
  },
  navigateOrRedirectToPage: function (e) {
    e && wx.navigateTo({
      url: e,
      fail: function (t) {
        console.log("----- navigate fail:" + e), wx.redirectTo({
          url: e
        });
      }
    });
  },
  redirectTo: function (e) {
    wx.redirectTo({
      url: e
    });
  },
  navigateTo: function (e) {
    wx.navigateTo({
      url: e,
      fail: function (t) {
        console.warn("----- navigate fail:" + e), wx.redirectTo({
          url: e
        });
      }
    });
  },
  navigateBack: function (e) {
    isEmpty(e) && (e = 1), wx.navigateBack({
      delta: e
    });
  },

  showModel: function (e, t, n, o) {
    var r = n || "";
    wx.showModal({
      title: e,
      content: t,
      confirmText: r,
      success: o
    });
  },
  showModal: function (e, t) {
    notEmpty(e) ? wx.showModal({
      title: e,
      content: t
    }) : wx.showModal({
      content: t
    });
  },

  showToastSuccess: (getApp(),
    function (e) {
      setTimeout(function () {
        wx.showToast({
          title: e,
          image: "/images/toast-tip.png",
          duration: 1500
        });
      }, 500);
  }),
  showToastFail: function (e) {
    setTimeout(function () {
      wx.showToast({
        title: e,
        image: "/images/toast-error.png",
        duration: 1500
      });
    }, 500);
  },
  showToast: function (e, t) {
    wx.showToast({
      title: e || "成功",
      duration: t || 1e3
    });
  },
  showErrToast: function (e, t) {
    "string" != typeof e && (e = "啊哦出错了"), wx.showToast({
      title: e || "啊哦出错了",
      image: S.error,
      duration: t || 1e3
    });
  },
  showTextToast: function (e, t) {
    wx.showToast({
      icon: "none",
      title: e || "成功",
      duration: t || 1e3
    });
  },
  hideToast: function () {
    wx.hideToast();
  },
  showLoading: function (e) {
    wx.showLoading({
      title: e || "请等待"
    });
  },
  hideLoading: function () {
    wx.hideLoading();
  },
  previewImage: function (e, t) {
    wx.previewImage({
      urls: e,
      current: t || e[0]
    });
  },

  setShareWithTicket: function () {
    wx.showShareMenu && wx.showShareMenu({
      withShareTicket: !0
    });
  },
  showShareMenu: function (e) {
    wx.showShareMenu ? wx.showShareMenu({
      withShareTicket: e
    }) : N("showShareMenu: 版本过低");
  },
  hideShareMenu: function () {
    wx.hideShareMenu ? wx.hideShareMenu() : N("hideShareMenu: 版本过低");
  },
  randomInt: function (e, t) {
    return Math.floor(Math.random() * (t - e) + e);
  },
  randomString: function (e) {
    for (var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], r = "", n = 0; n < e; n++) r += t[Math.ceil(35 * Math.random())];
    return r;
  }
}
