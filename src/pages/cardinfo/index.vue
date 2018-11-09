<template>
  <div class="intro_root">
     <div class='container'>
  <div class='warpBox'>
    <div class='boxbg'><image :src='cardbg'></image></div>

    <div class='box2'>
      <div class='box2top'>
       <div class='left'>
         <div class='name'>{{userinfo.cardname}}</div>
         <div class='zhiwei'><text>{{userinfo.companys}}</text><text>{{userinfo.jobs}}</text></div>
         <div class='gs'>{{userinfo.companys}}</div>
       </div> 
       <div class='right'><image :src='userinfo.cardimg'></image></div>
      </div>
      <div class='dizhi'>地址：{{userinfo.region}}</div>
      <div class='phone'>电话：<text>{{userinfo.p1}}</text></div>
    </div>


    <div class='info'>
     <div><text>{{userinfo.clicks}}</text>人气</div> <div><text>{{userinfo.praise}}</text>点赞</div> <div><text>{{userinfo.attention}}</text>关注</div>
    </div>

   
    <!--item end-->
  </div>
  <div class='btnlist'>
       <button class="btnitem zanbtn" :class="btn0?'actives':''"   @click='zan'>{{btn0?'已赞':'赞'}}</button>
       <button class="btnitem" :class="btn1?'actives':''"  @click='tion'>{{btn1?'已关注':'关注'}}</button>
       <button class='btnitem' open-type='share'>分享</button>
     </div>
</div>

  <div class="btnwarp">
    <div class='infobtn' @click='infonext'><text>返回首页</text></div>
    <div class="infobtn" @click="shouji"><text>一键存入手机号</text></div>
  </div>
  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'

export default {
  data () {
    return {
      "cardbg": [config.apimg + "/image/card/cardbg.png"],
    userinfo:{},
    carid:0,
    memberId:0,  //此处是当前用户ID
    memberIds:0,
    btn0:false,
    btn1: false,
    list: [{ name: '人气', num: 0, image: config.apimg + "/image/card/ren.png", url: '../cardlike/cardlike' },
    { name: '点赞', num: 0, image: config.apimg + "/image/card/zan.png", url: '../cardlike/cardlike' },
    { name: '关注', num: 0, image: config.apimg + "/image/card/chang.png", url: '../cardguanzhu/cardguanzhu' }
    ]
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题中显示加载
    //初始化数据（页面传参的用户id）
    this.onloads(this.memberIds);
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500)
  },
  components: {
    
  },

  methods: {
     //判断是否已关注
      tionbool:function(){
        let that=this;
        let url ='/api/businessCard/whetherGuanzhu'
        let data = { cardId: that.carid, focusMemberId: that.memberId }
        request.moregets(url, data).then(function (res) {
          console.log('判断关注返回值', res);
          if(res.code==1){
              that.btn1=true
          }
        })
      },
 //初始化请求数据
  onloads: function (memberId) {
    let that = this;
    let url = '/api/businessCard/getCardDate'
    let data = { memberId: memberId}
    request.moregets(url, data).then(function (res) {
      if (res.code == 0) {
          that.userinfo=res.CardDate,
          that.list[0].num=res.CardDate.industryid,
          that.list[1].num=res.CardDate.praise,
          that.list[2].num=res.CardDate.attention,
          that.carid=res.CardDate.cardid

          console.log('获得的初始化数据',res)
      }else if(res.code==1){
        request.showSuccess('此人未创建名片','../mycard/main')
      }
    }).then(function (){
      //查看增加人气
      that.renqi(that.carid)
    })
  },

    //增加人气
  renqi: function (memberId){
    let lookmemberId = wx.getStorageSync('memberId')
    let url ='/api/businessCard/lookCard'
    let data = { cardId: memberId, lookMemberId: lookmemberId}
    if (!lookmemberId || lookmemberId==''){
      request.showModels('您还没有登录','../index/main','../index/main')
   }else{
      request.moregets(url, data).then(function(res){
        console.log('增加人气', res)
      }) 
   }
  },

  //点赞
  zan: function () {
    let that=this;
    let url ='/api/businessCard/dianzanCard'
    console.log(that.carid)
    let data = { cardId: that.carid, likeMemberId: that.memberId}
    //请求数据
    request.moregets(url, data).then(function(res){
      console.log(res);
      that.btn0=true
      request.tip('点赞成功', 'loading')
    })
  },
  //点击关注
  tion:function(){
    let that=this;
    let url ='/api/businessCard/guanzhuCard'
    let data = { cardId: that.carid, focusMemberId: that.memberId}
    request.moregets(url, data).then(function (res) {
      //点击数据刷新
      that.onloads(that.memberIds);
      if(res.code==1){
        request.tip('您已关注','loading')
      }else if(res.code==0){
        request.tip('关注成功', 'loading')
      }
    })
  },

 

  infonext:function(){
    console.log("666")
    wx.switchTab({
      url: '../index/main',
    })
  },
   //跳转
  // tonext: function (e) {
  //   let that = this;
  //   let url = e.currentTarget.dataset.url; //获取跳转路径
  //   wx.navigateTo({
  //     url: url,
  //   })
  // }

 shouji(){
    
    let that=this;
    wx.showActionSheet({
      itemList: ['呼叫', '添加联系人'],
      success (res) {
        console.log(res.tapIndex)
        if(res.tapIndex==0){
          wx.makePhoneCall({ phoneNumber: that.userinfo.p1});
        }else if(res.tapIndex==1){
          wx.addPhoneContact({
              firstName:that.userinfo.cardname,
              mobilePhoneNumber:that.userinfo.p1,
              addressCity:that.userinfo.region,
              organization:that.userinfo.companys,
              title:that.userinfo.jobs
          })
        }
      }
    })
  },



  },

 //发送名片给好友
  onShareAppMessage: function () {
    let that = this;
    console.log('名片分享')
    return {
      path: '/pages/cardinfo/cardinfo?memberId=' + this.data.memberIds
    }
  },
  
  //添加号码到通讯录
 

  created () {
   
  },

  onLoad: function (options) {
      let dqmemberId = wx.getStorageSync('memberId')
      this.memberId=dqmemberId;
    //增加人气
      if (options.scene == undefined) {
   
        this.memberIds=options.memberId;
        }
        else {
         this.memberIds=decodeURIComponent(options.scene);
        }

      
  },
    onShow:function(){
    let that=this;
    console.log("查看ID",that.memberId,that.memberIds)
    if (that.memberId == that.memberIds){
      request.showModels('您正在查看自己的名片', '/pages/mycard/main', '/pages/index/main')
      console.log("输出ID",that.memberId,that.memberIds)
    } else if (!that.memberId) {
      request.showModels('请先登录', '/pages/index/main', '/pages/index/main')
    } else if (that.memberId == '00') {
      request.showModels('您还没有登录', '/pages/index/main', '/pages/index/main')
    } else {
      //初始化数据（页面传参的用户id）
      that.onloads(that.memberIds);
      //判断关注返回值
      that.tionbool();
    }
  },

}
</script>

<style scoped>
page{background: #fff;}


.container{padding: 30rpx;}
.warpBox{margin-top: 40rpx;position: relative;width: 100%;border-radius: 15rpx;overflow: hidden;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}
.box1{z-index: 2;position: relative;display: flex;align-items: center;justify-content: center;flex-direction: column;height: 460rpx; }
.box1 text{font-size: 32rpx;color: #8e8e8e;font-weight: 100;}
.boxbg{position:absolute;top: 0;left: 0;width: 100%;z-index: 1}
.boxbg image{width: 100%;height: 300rpx;}
.box01btn{
  border-radius: 40rpx;
  font-weight: 200;
  color: #666;
  font-size: 34rpx;
  border:1px solid #666;padding-left: 30rpx;padding-right:30rpx;
  height: 70rpx;line-height: 70rpx;
  margin-top: 25rpx;
}

.box2{height: 290rpx;padding: 35rpx;padding-top: 50rpx;z-index: 2;position: relative;}
.box2top{display: flex;}
.box2top .right image{
height: 80rpx;width: 80rpx;border-radius: 50%;
}
.box2top .left,.right{width: 50%;}
.box2top .left text{color: #8e8e8e;font-size: 26rpx;font-weight: 200;margin-right: 25rpx;}
.box2top .name{font-size: 50rpx;color: #666;font-weight: 100;}
.box2top .gs{font-size: 26rpx;color: #666;padding-top: 8rpx}
.dizhi{font-size:26rpx;color: #666;padding-top: 10rpx; }
.phone{font-size:26rpx;color: #666;padding-top: 10rpx;}
.phone text{color: #ff7903;}
.box2top .right{display: flex;justify-content: flex-end;}

.info{width: 50%;margin: auto;display: flex;justify-content: space-around;padding-bottom: 40rpx;}
.info view{font-size: 25rpx;font-weight: 100;color: #ccc}
.info text{color: #ff7903;}


.btnlist{display: flex;justify-content: space-around;margin-top: 46rpx;width: 90%;}
.btnitem{width: 150rpx;font-size: 28rpx;padding: 5rpx 0;color:#8e8e8e;border-radius: 35rpx;text-align: center;border:1px solid #8e8e8e;margin: 0; line-height: 1.5;}

.btnitem{background: #fff;}
.zanbtn:active{border:1px solid #ff7903;color: #ff7903;background: #fff;}

.infobtn{margin-top: 75rpx;width:90%;margin:auto;background:#ff7903;color:#fff;border-radius:50rpx;height:70rpx;
line-height:70rpx;text-align: center;}
.infobtn text{font-size: 34rpx;}

.actives{border:1px solid #ff7903;color: #ff7903;background: #fff;}

.btnwarp{display: flex;justify-content: space-between;width: 90%;margin: auto;}
.btnwarp div{width: 48%;}

</style>