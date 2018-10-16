<template>
  <div class="presen_root">
    <div class="presen_img" :style="{width:imageWidth,height:imageHeigth}">
      <image :src="urlImg" alt=""/>
    </div>
    <div class="ewmMask" @click="showEwm()">

    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
     urlImg:'',
     ewmImg:[],
     imageWidth:"",
     imageHeigth:"",
    }
  },

  components: {
    
  },
 onLoad:function(option){
  var that=this;
  that.urlImg=option.urlImg;
  that.ewmImg[0]=option.ewmImg;
  var windWidth=(wx.getSystemInfoSync().windowWidth)*0.95;
  var imageWidth=windWidth+"px";
  that.imageWidth=imageWidth;
  that.imageHeigth=windWidth*1.5722+'px';
    
 },
  methods: {
    showEwm:function(){
      var that=this;
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: that.ewmImg // 需要预览的图片http链接列表
      })
    }
  },

  created () {
   
  }
}
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.presen_root{
  width: 95%;
  margin: 0 auto;
}
 .presen_img{
   overflow: hidden;
 }
 .ewmMask{
   width: 120px;
   height: 120px;
   position: absolute;
   bottom:15vh;
   left: 95px; 
 }
</style>