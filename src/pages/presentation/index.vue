<template>
  <div class="presen_root">
    <div class="informationList" @click="jumppresentationdetail">
      <div class="informationListImg">
        <image src="https://shop.guqinet.com/html/images/zs/banner.jpg"></image>
      </div>
      <div class="title">
        这是一片资讯文章
      </div>
      <div class="time">
        2018-08-29
      </div>
    </div>
     <div class="informationList" @click="jumppresentationdetail">
      <div class="informationListImg">
        <image src="https://shop.guqinet.com/html/images/zs/banner.jpg"></image>
      </div>
      <div class="title">
        这是一片资讯文章
      </div>
      <div class="time">
        2018-08-29
      </div>
    </div>
     <div class="informationList" @click="jumppresentationdetail">
      <div class="informationListImg">
        <image src="https://shop.guqinet.com/html/images/zs/banner.jpg"></image>
      </div>
      <div class="title">
        这是一片资讯文章
      </div>
      <div class="time">
        2018-08-29
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageWidth:'',
      presenImg: [
        
      ]
    };
  },

  components: {},
  onLoad:function(){
    var that=this;
    var imageWidth=(wx.getSystemInfoSync().windowWidth-20)/2+"px";
    that.imageWidth=imageWidth;
    
  },
  methods: {
    jumppresentationdetail:function(){
      wx.navigateTo({
        url:'../presentationdetail/main'
      });
    }
  },

  created() {},
  onShareAppMessage: function() {
    return {
      title: "微鑫云开发招商",
      desc: "小程序招商开发",
      path: "pages/presentation/main"
    };
  }
};
</script>

<style scoped>
image {
  width: 100%;
  display: block;
}
.presen_root {
  width: 100%;
  background: #f3f3f3; 
  min-height: 100vh;
}
.informationList{
  background: #fff;
  width: 95%;
  margin: 0 auto; 
  margin-top: 20rpx;
}
.informationListImg{
  width: 100%;

}
.title{
  height: 80rpx;
  line-height: 80rpx;
  font-size: 0.9em;
}
.time{
  text-align: right;
  padding-right:20rpx;
  color: #ccc;
  height: 60rpx;
  line-height: 60rpx;
}
</style>