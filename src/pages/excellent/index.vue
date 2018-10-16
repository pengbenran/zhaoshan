<template>
  <div class="excellent_root">
     <div class="head">
      <div class="headleft">   
        <image src="https://shop.guqinet.com/shopimages/test/6432d492-cd16-4ab6-adb5-64f5afa02c6a.png"></image>
      </div>
      <div class="headright">微鑫云臻</div>     
     </div>
     <div class="introImg">
        <div class="introImgList">
          <image src="/static/images/606939004297436382.jpg"></image>
        </div>
        <div class="introImgList">
          <image src="/static/images/606939004297436382.jpg"></image>
        </div>
        <div class="introImgList">
          <image src="/static/images/606939004297436382.jpg"></image>
        </div>
     </div>
     <div class="title">
       小程序介绍
     </div>
     <div class="intro">
        一款电商类小程序。走的是清新简洁的功能风格
     </div>
       <div class="title">
       功能介绍
     </div>
     <div class="intro">
        一款电商类小程序。走的是清新简洁的功能风格
     </div>
      <div class="title">
       小程序二维码
     </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
     
    }
  },

  components: {
    
  },

  methods: {
    
  },

  created () {
   
  },
  onShareAppMessage: function () {
    return {
      title: '微鑫云开发招商',
      desc: '小程序招商开发',
      path: 'pages/intro/main'
    }
  }
}
</script>

<style scoped>

image{
  width: 100%;
  /*height: 100%;*/
  display: block;
}
.head{
  width: 100%;
  display: flex;
  padding: 20rpx;
  box-sizing: border-box;
}
.headleft{
  width: 200rpx;
  height: 200rpx;
  overflow: hidden;
}
.headleft image{
  height: 100%;
}
.headright{
  flex-grow: 1;
  padding-top:30rpx;
  padding-left: 30rpx;
  box-sizing: border-box;
}
.introImg{
  display: flex;
}
.introImgList{
  width: 33%;

}
</style>