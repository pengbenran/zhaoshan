<template>
  <div class="scope_root">
    
    <swiper class="swimg" indicator-dots='true' autoplay='true'>
          <swiper-item v-for="(item,index) in imglist" :index='index' :key='item'><img :src="item.imageUrl"></swiper-item>
    </swiper>

     <div class="cominfo">
      <ul class="con_ul">    
        <li v-for="(item,index) in list" :index='index' :key="item" @click="toinfo(item.imageId,item.movieName)">
          <span>{{item.movieName}}</span><i class="fa fa-sort-asc" aria-hidden="true"></i>  
        </li>
      </ul>
     </div>
  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'

export default {
  data() {
    return {
    banner:[
      'https://shop.guqinet.com/html/images/zs/banner.jpg',
      'https://shop.guqinet.com/html/images/zs/banner1.jpg',
      'https://shop.guqinet.com/html/images/zs/banner2.jpg'],
       imageWidth:'',
       headerimg:config.imgurl+'commply.png',
       list:[],
       imglist:[]
      };
  },

  components: {},
  onLoad:function(){
    var that=this;
    var imageWidth=(wx.getSystemInfoSync().windowWidth-20)/2+"px";
    that.imageWidth=imageWidth;
    
       that.onloads();
  },
  methods: {
    jumpcompany:function(){
      wx.navigateTo({
        url:'../companydetail/main'
      });
    },
    
    //加载初始化数据
    async onloads(){
      let that=this;
      const res= await request.moregets('/api/investment/companyPicture')
      console.log("轮播图",res)
      that.imglist=res.pictures;
      const info= await request.moregets('/api/investment/companyIntroduces')
      console.log("简介",info.pictures)
      that.list=info.pictures;
    },
    toinfo(id,name){
      console.log(id,name);
      if(name=='联系我们'){
        wx.navigateTo({ url: '../lianxi/main?id='+id });
      }else{
        wx.navigateTo({ url: '../companydetail/main?id='+id });
      }
     
    }
  },


  onShareAppMessage: function() {
    return {
      title: "微鑫云开发招商",
      desc: "小程序招商开发",
      path: "pages/BusinessScope/main"
    };
  }
};
</script>

<style scoped>
image {
  width: 100%;
  height: 100%;
  display: block;
}
.scope_root{background: #e7e7e7;min-height: 100vh;}
.headerimg{height: 430rpx;}
.cominfo{font-weight: 100;font-size: 32rpx;text-align: justify;color: #666;line-height: 48rpx;}
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
.company{
  background: #f3f3f3;
 height: 700rpx;
 padding: 20rpx;
 box-sizing: border-box;
}
.companylist{
  height: 150rpx;
  line-height: 150rpx;
  background: #fff;
  margin: 0 auto;
  margin-bottom:20rpx;
  border-radius: 20rpx;
  padding-left: 20rpx;
  box-sizing: border-box;
}

.swimg{height: 390rpx; }

.con_ul{padding:0 10rpx;}
.con_ul li{display: flex;justify-content: space-between;align-items: center;margin-top: 12rpx;line-height: 140rpx;padding: 0 25rpx;background: #fff;}
.con_ul li i{font-size: 42rpx;transform: rotate(90deg);}
.con_ul li span{color: #000;}
.con_ul li:nth-child(1){border-top-left-radius:15rpx;border-top-right-radius:15rpx; }
</style>
