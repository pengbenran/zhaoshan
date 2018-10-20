<template>
  <div class="excellent_root">
     <div class="head">
      <div class="headleft">   
        <image :src="example.picture"></image>
        <!-- <image :src="example.logo"></image> -->
      </div>
      <div class="headright">微鑫云臻</div>     
     </div>
      
      <div>
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
      example:[],
      article:''
    }
  },

  components: {
    wxParse
  },

  methods: {
    
    async onloads(option){
      let that=this;
      let url='/api/investment/example'
      let data={id:option.id}
      const res=await request.moregets(url,data)
      that.example=res.example
      that.article=res.example.content
      console.log("输出详情页内容",res)
    }
  },
  onLoad:function(option){
   this.onloads(option)
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
@import url("~mpvue-wxparse/src/wxParse.css");
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
  border-bottom: 5px solid rgb(243, 243, 243);
}
.headleft{ 
  display: flex; align-items: center;
  overflow: hidden;
}
.headleft image{
  border-radius: 20rpx;
  width: 200rpx;
  height: 200rpx;
  margin-right: 20rpx;
}
.headright{

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