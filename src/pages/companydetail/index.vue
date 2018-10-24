<template>
  <div class="intro_root">
    <div class="top"><i class="fa fa-paper-plane-o" aria-hidden="true"></i> {{company.movieName}}</div>
     <div class="info">
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
     imageId:0,
     company:[],
     article:''
    }
  },

  components: {
    wxParse
  },

  methods: {
   async onloads(){
     let that=this;
     const res= await request.moregets('/api/investment/companyIntroduce',{
       id:that.imageId
     })
     console.log("信息",res)
     that.article=res.company.imageUrl;  
     that.company=res.company;
   }
   
  },
  onLoad(options){
   let that=this;
   that.imageId=options.id;
   
   //加载初始化数据
   that.onloads();
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
  height: 100%;
  display: block;
}

.top{line-height: 110rpx;font-weight: 200;font-size: 34rpx;border-bottom: 4px solid #f5f5f5;padding: 0 15rpx;}
</style>