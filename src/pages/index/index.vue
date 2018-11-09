<template>
  <div class="index_root">
    <swiper id="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">  
    <block v-for="(item, index) in banner" :index="index" :key="key">  
        <swiper-item>  
            <image :src="item.imageUrl" class="slide-image"/>  
        </swiper-item>  
    </block> 
    </swiper>

    <div class="title">
      营销功能
    </div>
    <div class="item">
      <div class="itemlist" v-for="(item,index) in baseList" :key="key" :index="index">
        <div class="itemImg">
          <image :src=item.itemImg></image>
        </div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>

    <div class="title">
      基础功能
    </div>
    <div class="item">
      <div class="itemlist" v-for="(item,index) in Marketinglist" :key="key" :index="index">
        <div class="itemImg">
          <image :src=item.itemImg></image>
        </div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
    <div class="title">
      经典案例
    </div>
    <div class="excellent">
      <div class="excellentlist" v-for="(item,index) in excellentItem" :key="key" :index="index" @click="jumpExcellent(item.id)">
        <div class="excellentImg">
          <image :src="item.picture"></image>
        </div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
 <!--<div class="company">
      <span class="line"></span>
      <span class="company_title">公司地址</span>  
    </div>
    <div class="company_loca">
      <div class="icon"   >
        <image src="/static/images/loca.png" @click="openMap()" alt=""/>
      </div>
      <div class="title" @click="openMap()" :style="{width:titleWidth}">浙江省嘉兴市经济技术开发区中环南路2608号福地广场1005-2室</div>
      <div class="icon" @click="Makecall()">
        <image src="/static/images/phone.png" alt=""/>
      </div>
    </div>
    <div class="divline"></div>
    <div class="company">
      <span class="line"></span>
      <span class="company_title">小程序优势</span>  
    </div>
    <div class="img_content">
      <div class="img_list" v-for="item in ImgList" :key="key" :index="index">
        <div class="Img" :style="{width:imageWidth,height:imageHeigth}">
            <image :src="item.urlImg" alt=""/>  
        </div>
      </div>  
    </div> -->
    <div class="showmodel" v-if='showbool'>
      <div class="box">
        <span>一键登录</span>
        <button  class="modelbtn" open-type="getUserInfo" @getuserinfo="getUserInfo"> 点击授权登录 </button>
      </div>
    </div>

  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'

export default {
  data () {
    return {
      imageHeigth:'',
      imageWidth:'',
      titleWidth:'',
      showbool:false,
      ImgList:[
      {urlImg:'https://shop.guqinet.com/html/images/zs/7.jpg'},
      {urlImg:'https://shop.guqinet.com/html/images/zs/9.jpg'},
      {urlImg:'https://shop.guqinet.com/html/images/zs/10.jpg'}
        ],
      banner:[],
      baseList:[
        {itemImg: config.imgurl+'yuyue.png',name:"预约",jumpUrl:''},
        {itemImg: config.imgurl+'youhuijuan.png',name:"优惠券",jumpUrl:''},
        {itemImg: config.imgurl+'jifen.png',name:"积分",jumpUrl:''},
        {itemImg: config.imgurl+'huiyuanka.png',name:"会员卡",jumpUrl:''},
        {itemImg: config.imgurl+'hongbao.png',name:"红包",jumpUrl:''},
        {itemImg: config.imgurl+'xianshi.png',name:"限时折扣",jumpUrl:''},
        {itemImg: config.imgurl+'pintuan.png',name:"拼团",jumpUrl:''},
        {itemImg: config.imgurl+'kanjia.png',name:"砍价",jumpUrl:''},
        {itemImg: config.imgurl+'weifenxiao.png',name:"微分销",jumpUrl:''},
        {itemImg: config.imgurl+'haibao.png',name:"海报",jumpUrl:''},
        {itemImg: config.imgurl+'cun.png',name:"储值",jumpUrl:''},
        {itemImg: config.imgurl+'cuxiao.png',name:"促销",jumpUrl:''},
        {itemImg: config.imgurl+'shop.png',name:"积分商城",jumpUrl:''},
        {itemImg: config.imgurl+'luntan.png',name:"论坛",jumpUrl:''},
        {itemImg: config.imgurl+'baoming.png',name:"预约报名",jumpUrl:''},
      ],
      Marketinglist:[
        {itemImg: config.imgurl+'dizhi.png',name:"地图",jumpUrl:''},
        {itemImg: config.imgurl+'fenxiang.png',name:"分享",jumpUrl:''},
        {itemImg: config.imgurl+'kefu.png',name:"客服",jumpUrl:''},
        {itemImg: config.imgurl+'shipin.png',name:"视频",jumpUrl:''},
        {itemImg: config.imgurl+'zixun.png',name:"图文介绍",jumpUrl:''},
        {itemImg: config.imgurl+'guanggao.png',name:"广告",jumpUrl:''},
        {itemImg: config.imgurl+'yinpin.png',name:"语音",jumpUrl:''},
        {itemImg: config.imgurl+'zhao.png',name:"招商",jumpUrl:''},
        {itemImg: config.imgurl+'shangjia.png',name:"商家专区",jumpUrl:''},
        {itemImg: config.imgurl+'ma.png',name:"一码两用",jumpUrl:''},
        {itemImg: config.imgurl+'dingdan.png',name:"订单",jumpUrl:''},
        {itemImg: config.imgurl+'gonggao.png',name:"公告",jumpUrl:''},
        {itemImg: config.imgurl+'yima.png',name:"一品一码",jumpUrl:''},
        {itemImg: config.imgurl+'zhixun.png',name:"资讯",jumpUrl:''},
        {itemImg: config.imgurl+'dpgl.png',name:"店铺管理",jumpUrl:''},
      ],
       excellentItem:[]

    }
  },

  components: {
    
  },
   onLoad:function(){
    var that=this;
    var windWidth=(wx.getSystemInfoSync().windowWidth-20);
    var imageWidth=windWidth+"px";
    that.titleWidth=(windWidth-200)+"px";
    console.log(that.titleWidth);
    that.imageWidth=imageWidth;
    that.imageHeigth=windWidth/1.777+'px';

    this.getCode();
    //初始化数据
    this.onloads();
  },
  methods: {
    async onloads(){
      let that=this;
      let url='/api/investment/index'
      let res=await request.moregets(url)
      that.banner=res.indexImg;
      that.excellentItem=res.ExampleList
      console.log("首页初始化数据",res)
    },
    Makecall:function(){  
      var that=this;
      wx.makePhoneCall({
      phoneNumber: '0573-83172330' //仅为示例，并非真实的电话号码
      })
    },
    openMap:function(){
      var that=this;
      wx.openLocation({
        latitude: 30.74118,
        longitude: 120.72715,
        name:'浙江省嘉兴市经济技术开发区中环南路2608号福地广场1005-2室 ',
        scale: 28
      })
    }, 
    jumpExcellent:function(id){
      wx.navigateTo({
        url:'../excellent/main?id='+id
      });
    },

  
    
    getUserInfo(){//获取用户信息
       let that=this;
       let memberId=wx.getStorageSync('memberId');
       if(memberId='00'){
             wx.login({
               success:res=>{
               wx.getUserInfo({
                  success:function(res_user){
                  console.log(' 查看请求数据',res_user)
                  let userinfo=JSON.parse(res_user.rawData);
                  console.log("touxiang",userinfo)
                   wx.setStorageSync("face", userinfo.avatarUrl)
                  let url='/api/weCatLogin'
                  let data={
                         code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
                        headurl: res_user.userInfo.avatarUrl,//这些是用户的图片信息
                        nickname: res_user.userInfo.nickName,//获取昵称
                        sex: res_user.userInfo.gender,//获取性别
                        country: res_user.userInfo.country,//获取国家
                        province: res_user.userInfo.province,//获取省份
                        city: res_user.userInfo.city//获取城市
                     }
                      const resdata =request.moregets(url,data).then(function(resdata){
                          console.log("获得的参数",resdata);
                          that.showbool=false;
                          wx.setStorageSync("openid", resdata.openid)//可以把openid保存起来,以便后期需求的使用
                          wx.setStorageSync("memberId", resdata.memberId)
                      })
                  }
                })
               } 
             })
              // 获取code
            
       }else{
        wx.showToast({
          title: '您已是会员',
          icon: 'success', //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
       }
    },


  getCode(){
     var that = this;
      wx.login({
        success: function (res) {
          if (res.code) {
            let url='/api/byCode';
            let data={code: res.code}
            console.log("899999999989")
            request.moregets(url,data).then(function(userres){
                if (userres.memberDo != null) {
                that.showbool=false;
                wx.setStorageSync("memberId", userres.memberDo.memberId)
                 wx.setStorageSync("face", userres.memberDo.face)
                console.log("ID",userres.memberDo.memberId)
                }
                else {
                let memberId="00"
                wx.setStorageSync('memberId', "00")
                that.showbool=true;
                console.log("我进入显示框",that.showbool)
                }
            })
          }
        }
      })
    },
  },

  created () {
   
  },

  onShareAppMessage: function () {
    return {
      title: '微鑫云开发招商',
      desc: '小程序招商开发',
      path: 'pages/index/main'
    }
  }
}
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block; 
}
#swiper{
height:190px;
}
.item{
width: 100%;
display: flex;
flex-wrap: wrap;
}
.itemlist{
  width: 20%;
  text-align: center;
  font-size: 0.8em;
  margin-bottom: 16rpx;
}
.itemImg{
  width: 85rpx;
  height: 85rpx;
  margin: 0 auto;
  overflow: hidden;
}
.excellent{
  display: flex;
  flex-wrap: wrap;
}
.excellentlist{
  margin-bottom: 15rpx;
width: 33%;
text-align: center;
}
.excellentlist .name{margin-top: 6rpx;}
.excellentImg{
  width: 210rpx;
  height: 210rpx;
  margin: 0 auto;
  border-radius: 16rpx;overflow: hidden;
}
.title{
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  font-weight: 200;
  margin-top: 20rpx;
}
.name{font-size: 29rpx;color:#666;}

.showmodel{
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  position: absolute;
  top:0;left: 0;width: 100%;
}
.showmodel{display: flex;justify-content: center;align-items: center;}
.box{display: flex;justify-content: center;flex-direction: column;text-align: center;
  background: #fff;width: 65%;height: 280rpx;border-radius: 20rpx;box-shadow: 0 0 10px #fff;}
.modelbtn{width: 75%;background: #1aad19;height: 68rpx;line-height: 68rpx;font-size: 34rpx;color: #fff;}



</style>