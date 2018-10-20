<template>
  <div class="intro_root">
     <div class='top'>
  <div v-for="(item,index) in listtop" :index='index' :key="item"  class="item" :class="item.topbool?'active':''"  @click='clickTab(index)'>{{item.names}}</div>
</div>

<div v-if='indexs==0'>
  <div class='list' v-for="(item,index) in whoFocusMe" :index='index' :key='item'>
    <div class='listitem'>
    <div class='info'>
      <div class='infoimg'   @click='tonext(item.cardid,item.focusmemberid)'><image :src='item.face'></image></div>
      <div class='infoname'>
        <text class='name'>{{item.nickName?item.nickName:item.uname}}</text>
        <!-- <text>你好世界</text><text>谷琴网络公司</text>
        <div class='infolist'><div><text>4</text>关注</div><div><text>4</text>点赞</div><div><text>4</text>人气</div></div> -->
        <div class='time'>{{item.focustime}}</div>   
      </div>
      <div class='infoweixing'>
      <!-- <image src='{{weiimg}}'></image> -->
      <div class='btn' @click='close(item.cardid,item.mermberId)'  >取消关注</div></div>
    </div>
    </div>
  </div>
</div>

<div v-if='indexs==1'>
  <div class='list' v-for='(item,index) in iFocus' :index='index' :key='item'>
    <div class='listitem'>
    <div class='info'>
      <div class='infoimg' @click='tonext(item.cardImg,item.mermberId)'><image :src='item.cardImg'></image></div>
      <div class='infoname'>
        <text class='name'>{{item.cardName}}</text>
        <!-- <text>你好世界123</text><text>谷琴网络公司</text>
        <div class='infolist'><div><text>4</text>关注</div><div><text>4</text>点赞</div><div><text>4</text>人气</div></div> -->     
        <div class='time'>{{item.focustime}}</div>
      </div>
      <div class='infoweixing'>
      <!-- <image src='{{weiimg}}'></image> -->
      <div class='btn' @click='close(item.cardid,item.mermberId)' >取消关注</div></div>
    </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'

export default {
  data () {
    return {
         likebool: true,
          weiimg: config.apimg + "/image/card/weixin.png",
          face: '',
          listtop: [{ names: '谁关注我', topbool: true }, { names: '我关注谁', topbool: false }],
          whoFocusMe:[],
          iFocus:[],
          indexs:0,

    }
  },
  //下拉刷新
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading() //在标题中显示加载
    this.loads('/api/businessCard/guanzhuClick');
    setTimeout(function(){
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500)
  },
  components: {
    
  },

  methods: {
      //加载初始化数据
      loads: function (url){
        let that=this;
        let data = { cardId: this.cardId, focusMemberId: this.focusMemberId}
        that.more(url, data,function(res){
        console.log('初始化后的数据',res)
          that.whoFocusMe=res.whoFocusMe,
          that.iFocus=res.iFocus
        })
      },
        //点击选中
      clickTab:function(index){
   
      let that=this;

      let indexs = index;
      that.listtop.forEach(function(item,index,arr){
        // var str = 'listtop[' + index + '].topbool';
        if(indexs==index){
            that.listtop[index].topbool=true,
            that.indexs=indexs
 
        }else{
            that.listtop[index].topbool=false
        }
      }) 
      },
        //跳转
      tonext:function(cardid,merberid){
        let that = this;
        // let cardid = e.currentTarget.dataset.cardid;
        // let merberid = e.currentTarget.dataset.merberid;
        // console.log(e)
        // console.log(cardid, merberid)
        wx.navigateTo({
          url: '../cardinfo/main?cardid=' + cardid + '&memberId=' + merberid,
        })
      },

       //取消关注
      close: function (cardid,focusmemberid){
        let that = this;
        let url ='/api/businessCard/quxiaoFocus'
        // let cardid = e.currentTarget.dataset.cardid;
        // let focusmemberid = e.currentTarget.dataset.focusmemberid;
        let data = { cardId: cardid, focusMemberId: focusmemberid }
        wx.showModal({
          title: '提示',
          content: '是否取消关注',
          success: function (res) {
            if (res.confirm){
              that.more(url, data, function (res) {
                wx.showToast({
                  title: '取消成功',
                })
              })
            } else if (res.cancel){
            
            }
          }
        })
      
      },
  

        //请求封装
      more: function (url, data, callback){
        request.moregets(url, data,callback).then(function (res) {
          // console.log('请求成功',res);
          callback(res)
        })
      }
  },

  created () {
   
  },

  onLoad: function (options) {
     let that=this;
      that.face=wx.getStorageSync('face')

    //初始化数据
      that.cardId=options.cardid,
      that.focusMemberId=options.memberId
  },
   
  onShow:function(){
    this.loads('/api/businessCard/guanzhuClick');
  },
}
</script>

<style scoped>
page{background: #fff;}
.top{
  display: flex;justify-content: space-around;padding-top: 15rpx;padding-bottom: 15rpx;border-bottom: 1px solid #e9e9e9;
}
.top .active{color: #000;}

.item{font-size: 32rpx;color: #a1a1a1;}

.list{padding: 15rpx 30rpx 0; }
.info{display: flex;margin-top: 15rpx;box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);border-radius: 15rpx;padding: 30rpx 20rpx;}
.infoimg{width: 135rpx;display: flex;align-items: center;justify-content: center;}
.infoimg image{width: 90rpx;height:90rpx;border-radius: 50%;}
.infoweixing{width:120rpx;}
.infoname{padding-top: 10rpx;flex-grow:1;}
.infoname .name{font-size: 38rpx;margin-bottom: 10rpx;color: #666;}
.infoname text{display: block;font-size: 24rpx;font-weight: 100;color: #bbbbbb;}
.infoname .tishi{color: #ccc;padding-top: 16rpx;}
.infoweixing{display: flex;flex-direction: column;justify-content:flex-end;}
.infoweixing image{width: 55rpx;height: 50rpx;align-self: flex-end;}
.infoweixing .btn{border:1px solid #ccc;font-size: 24rpx;text-align: center;color: #ccc;border-radius: 20rpx;}

.infolist{display: flex;}
.infolist view{display: flex;align-items: center;font-size:24rpx;margin-right: 18rpx;color:#bbbbbb;}
.infolist text{color:rgb(255, 183, 100);margin-right: 4rpx; }
.time{font-size: 28rpx;color: rgb(161, 161, 161);font-weight: 150;}
</style>