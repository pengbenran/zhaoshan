<template>
  <div class="presen_root">
    <div class="listwarp">
     <scroll-view scroll-y="true" @scrolltolower="searchScrollLower" :style="{height:scrollHeight+'px'}">
      <div class="informationList" @click="jumppresentationdetail(item.id)" v-for="(item,index) in consult" :index='index' :key='item'>
        <div class="informationListImg">
          <image :src="item.p3"></image>
        </div>
        <div class="title">
          {{item.title}}
        </div>
        <div class="time">
          {{item.releaseTime}}
        </div>
       </div>
       </scroll-view>
    </div>
  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'
import timedata from '../../utils/index'

export default {
  data() {
    return {
      imageWidth:'',
      presenImg: [
      ],
      consult:[],
      pageindex:0,
      pagegroup:4,
      scrollHeight:0
    };
  },

  components: {
  },
  onLoad:function(){
    var that=this;
    var imageWidth=(wx.getSystemInfoSync().windowWidth-20)/2+"px";
    that.imageWidth=imageWidth;
    this.onloads();

      wx.getSystemInfo({
          success:function(res){
                 that.scrollHeight=res.windowHeight
          }
      });
  },
  methods: {
    jumppresentationdetail:function(id){
      wx.navigateTo({
        url:'../presentationdetail/main?id='+id
      });
    },

    async onloads(){
      let that=this;
      let url='/api/investment/page'
      const res= await request.moregets(url,{
        offset:that.pageindex,
        limit:that.pagegroup
      })
      let arr=res.rows;
      //数组拼接
      console.log("长度",arr.length)
      if(arr.length){
          wx.showLoading({
          title: '加载中',
           })
          setTimeout(function () {
            wx.hideLoading()
            that.consult=that.consult.concat(arr);
              that.consult.forEach(function(item,index,arr){
              let timenum=item.releaseTime
              let time=that.timestampToTime(timenum)
              that.consult[index].releaseTime=time
              console.log('事件转换',time)
            });
          }, 1000)
    
      }else{
         wx.showLoading({
          title: '没有更多',
           })
             setTimeout(function () {
              wx.hideLoading()
            }, 1000)
      }
      
      console.log("咨询",res)
      // let time= that.timestampToTime(1539653760402)
    

      },

    //时间戳转换
    timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D;
      },
        searchScrollLower(){
          console.log("下拉刷新")
        　let that=this;
          that.pageindex=that.pageindex+1
          that.onloads()
          
         
        },
  },



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
@import url("~mpvue-wxparse/src/wxParse.css");
image {
  width: 100%;
  display: block;
}
.listwarp{padding-top: 1rpx;}



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
  margin-top: 15rpx;
  font-size: 0.8em;
  padding: 0 15rpx;
  color: #666;
}
.time{
  text-align: right;
  padding-right:20rpx;
  color: #ccc;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 32rpx;font-weight: 100;
}
</style>