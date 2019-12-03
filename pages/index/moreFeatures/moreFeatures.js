var util = require("../../../utils/util");

const app = getApp();

Page({
  data: { 
    features: []
  },
  onLoad: function() {
    var circleId = "", openGId = "", features = [];
    features.push({
      type: "vote",
      icon: "/images/mask1.png",
      title: "群投票",
      description: "仅群内可见 投票信息不泄露"
    }),
    features.push({
      type: "sport",
      icon: "/images/mask5.png",
      title: "群运动",
      description: "支持群内排行及分组PK"
    }),
    features.push({
      type: "wishes",
      icon: "/images/mask8.png",
      title: "送祝福",
      description: "自动获取接受者名称"
    }),
    features.push({
      type: "flower",
      icon: "/images/mask9.png",
      title: "识花君",
      description: "扫一扫 识别花草植物"
    }), 
    this.setData({
      circleId,
      openGId,
      features
    });
    console.log("features==>", features);
  },
  openFeature: function(a) {
    var r = a.currentTarget.dataset || {};
    if ("vote" === r.type) // 群投票
      util.navigateTo("/pages/vote/indexVote/indexVote?circleId=" + this.data.circleId);
    else if ("sport" === r.type) // 群运动
      util.navigateTo("/pages/sport/index/index?circleId=" + this.data.circleId + "&openGId=" + this.data.openGId); 
    else if ("wishes" === r.type) // 祝福
      util.navigateTo("/pages/card/newyear/template?ref=guide"); 
    else if ("flower" === r.type) {
      // var n = i.envVersion;
      // wx.navigateToMiniProgram({
      //     appId: "wxbeb90f1d6c17059b",
      //     path: "pages/main/main?scene=@74",
      //     envVersion: n
      // }), t.reportClickAction("识花君");
    }
  }
});