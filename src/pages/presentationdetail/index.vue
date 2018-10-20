<template>
  <div>
    <div class="top">
      <div class="title">{{Consult.title}}</div>
      <span class="time">{{time}}</span>
    </div>
    <div class="info presen_root">
       <wxParse :content="article" @preview="preview" @navigate="navigate" />  
    </div>
  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'
import wxParse from 'mpvue-wxparse'

export default {
  data () {
    return {
     article:"",
     time:"",
     Consult:[]
    }
  },

  components: {
    wxParse
  },
 onLoad:function(option){
  var that=this;

  that.onloads(option);
 },
  methods: {
   async onloads(option){
     let that=this;
     let url='/api/investment/consult';
     let data={id:option.id}
     const res=await request.moregets(url,data)
     that.Consult=res.Consult
     that.article=res.Consult.content
     
     that.time=request.timestampToTime(res.Consult.releaseTime)
     console.log("咨询xq",res,that.time)
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

img{
    width: 100%;
  height: 100%;
  display: block;
}

.top{border-bottom: 1px solid rgb(238, 238, 238);padding: 25rpx 20rpx 15rpx;}
.title{font-weight: bold;font-size: 34rpx;margin-bottom: 8rpx;color: #666;}
.time{font-size: 28rpx;font-weight: 100;color: #8e8e8e;}
.info span{font-size: 32rpx;font-weight: 100;}
.info {padding: 15rpx 0;}
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