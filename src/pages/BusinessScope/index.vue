<template>
  <div class="scope_root">
    <div class="headerimg"><img :src="headerimg"></div>
     <div class="cominfo">
        上海谷琴电子科技有限公司是一家集设计、研发、生产、销售为一体的新型互联网公司。公司于2014年成立，
        我们有专业的销售和技术团队，我们始终为客户提供好的产品和技术支持，健全的售后服务，推出适应市场
        需求的硬件及软件产品，如果您对我们公司的产品有兴趣，期待您的来电咨询。

     </div>
  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'

export default {
  data() {
    return {
    banner:['https://shop.guqinet.com/html/images/zs/banner.jpg',
      'https://shop.guqinet.com/html/images/zs/banner1.jpg',
      'https://shop.guqinet.com/html/images/zs/banner2.jpg'],
        imageWidth:'',
        headerimg:config.imgurl+'commply.png'
      };
  },

  components: {},
  onLoad:function(){
    var that=this;
    var imageWidth=(wx.getSystemInfoSync().windowWidth-20)/2+"px";
    that.imageWidth=imageWidth;
    
    
  },
  methods: {
    jumpcompany:function(){
      wx.navigateTo({
        url:'../companydetail/main'
      });
    }
  },

  created() {},
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
.headerimg{height: 430rpx;}
.cominfo{padding: 20rpx;font-weight: 100;font-size: 32rpx;text-align: justify;color: #666;line-height: 48rpx;}
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
</style>
