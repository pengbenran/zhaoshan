<template>
  <div class="scope_root">
    <swiper id="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">  
    <block v-for="(item, index) in banner" :index="index" :key="key">  
        <swiper-item>  
            <image :src="item" class="slide-image"/>  
        </swiper-item>  
    </block> 
    </swiper>
    <div class="company">
      <div class="companylist" @click="jumpcompany">
        产品介绍
      </div>
      <div class="companylist" @click="jumpcompany">
        公司介绍
      </div>
      <div class="companylist" @click="jumpcompany">
        商务合作
      </div>
      <div class="companylist" @click="jumpcompany">
        联系我们
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    banner:['https://shop.guqinet.com/html/images/zs/banner.jpg',
      'https://shop.guqinet.com/html/images/zs/banner1.jpg',
      'https://shop.guqinet.com/html/images/zs/banner2.jpg'],
      imageWidth:''};
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
