<template>
  <div class="index_root">
    <swiper id="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">  
    <block v-for="(item, index) in banner" :index="index" :key="key">  
        <swiper-item>  
            <image :src="item" class="slide-image"/>  
        </swiper-item>  
    </block> 
    </swiper>
    <div class="title">
      基础功能
    </div>
    <div class="item">
      <div class="itemlist" v-for="(item,index) in baseList" :key="key" :index="index">
        <div class="itemImg">
          <image :src=item.itemImg></image>
        </div>
        <div>{{item.name}}</div>
      </div>
    </div>
    <div class="title">
      营销功能
    </div>
    <div class="item">
      <div class="itemlist" v-for="(item,index) in Marketinglist" :key="key" :index="index">
        <div class="itemImg">
          <image :src=item.itemImg></image>
        </div>
        <div>{{item.name}}</div>
      </div>
    </div>
    <div class="title">
      经典案例
    </div>
    <div class="excellent">
      <div class="excellentlist" v-for="(item,index) in excellentItem" :key="key" :index="index" @click="jumpExcellent(item.jumpUrl)">
        <div class="excellentImg">
          <image :src="item.itemImg"></image>
        </div>
        <div>{{item.name}}</div>
      </div>
    </div>
 <!--    <div class="company">
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
  </div>
</template>

<script>

export default {
  data () {
    return {
      imageHeigth:'',
      imageWidth:'',
      titleWidth:'',
      ImgList:[
      {urlImg:'https://shop.guqinet.com/html/images/zs/7.jpg'},
      {urlImg:'https://shop.guqinet.com/html/images/zs/9.jpg'},
      {urlImg:'https://shop.guqinet.com/html/images/zs/10.jpg'}],
      banner:['https://shop.guqinet.com/html/images/zs/banner.jpg',
      'https://shop.guqinet.com/html/images/zs/banner1.jpg',
      'https://shop.guqinet.com/html/images/zs/banner2.jpg'],
      baseList:[
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"预约",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"地图",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"客服",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"广告",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"资讯",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"视频",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"音频",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"分享",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"跑马灯",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"服务通知",jumpUrl:''},
      ],
      Marketinglist:[
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"优惠劵",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"红包",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"会员卡",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"微分销",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"拼团",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"砍价",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"限时折扣",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"分享海报",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"积分",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"个人名片",jumpUrl:''},
      ],
      excellentItem:[{itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"微鑫云臻",jumpUrl:'../excellent/main'},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"微鑫云臻",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"微鑫云臻",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"微鑫云臻",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"微鑫云臻",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"微鑫云臻",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"微鑫云臻",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"微鑫云臻",jumpUrl:''},
      {itemImg:'https://shop.guqinet.com/shopimages/dimages/8dot3u9w-t0lc-8mqp-65rf-g07p93kaswum.png',name:"微鑫云臻",jumpUrl:''},]

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
    
  },
  methods: {
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
    jumpExcellent:function(Url){
      wx.navigateTo({
        url:Url
      });
    }
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
height:180px;
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
}
.itemImg{
  width: 100rpx;
  height: 100rpx;
  margin: 0 auto;
  overflow: hidden;
}
.excellent{
  display: flex;
  flex-wrap: wrap;
}
.excellentlist{
width: 33%;
text-align: center;
}
.excellentImg{
  width: 200rpx;
  height: 200rpx;
  margin: 0 auto;

}
.title{
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
}
</style>