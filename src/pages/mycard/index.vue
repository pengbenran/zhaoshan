<template>
  <div class="intro_root">
     <div class='container'>
  <div class='warpBox'>
    <div class='boxbg' v-if='boxbool'><image :src='cardbg'></image></div>
    <div class='box1' v-if='boxbool'>
       <text>您还没有自己的名片</text>
       <div class='box01btn' @click='tocardfrom'>点击立即拥有</div>
    </div>
    <div class='box2' v-else>
      <div class='box2top'>
       <div class='left'>
         <div class='name'>{{userinfo.cardname}}</div>
         <div class='zhiwei'><text>{{userinfo.departments}}</text><text>{{userinfo.jobs}}</text></div>
         <div class='gs'>{{userinfo.companys}}</div>
       </div> 
       <div class='right'><image :src='userinfo.cardimg'></image></div>
      </div>
      <div class='dizhi'>地址：{{userinfo.region}}</div>
      <div class='phone'>电话：<text>{{userinfo.p1}}</text></div>
    </div>

    <!--box1 end-->
    <div class='itemwarp'>
      <div class='item' v-for='(item,index) in list' :index='index' :key='item'  @click='tonext(item.url,item.name)'>
        <image :src='item.image'></image>
        <text>{{item.name}}：{{item.num}}</text>
      </div>
    </div>
    <!--item end-->
  </div>

<div class="pinList">
  <div class="item">
    <div class="item-left"></div>
    <div class="item-right"></div>
  </div>
</div>

<div class="btnwrp">
<div class='warpbtn'>
  <button class='btn' open-type='share' v-if="!boxbool">给好友递名片</button>
</div>
    
<div class='haibao' @click='shenImg'>
  <!-- <div class='haibaobtn' @click="eventDraw" v-if="!boxbool">生成海报</div> -->
<div class='haibaobtn' @click="toyixia" v-if="!boxbool">生成海报</div>
</div>
</div>
</div>

<div class='canvas' v-if='maskmodel'>
<div class='modelcard'>
  <div class='model'>
     <image :src="shareImage" class="share-image"></image>
     <canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"/>
  </div> 
  <div class='modelbtn'  @click="eventSave">保存本地</div>
  <div class='modelbtn modelbtntop' @click='guanbi'>关闭</div>
  </div>
</div>
<!-- <canvas canvas-id="shareCanvas" style="width:600px;height:900px"></canvas> -->
  
 


  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'

export default {
  data () {
    return {
    cardbg: config.apimg + "/image/card/cardbg.png",
    boxbool:true,
    face:'',
    list: [{ name: '我的人气',num:0, image: config.apimg + "/image/card/ren.png", url:'../cardlike/main'},
      { name: '我的点赞', num: 0, image: config.apimg + "/image/card/zan.png", url: '../cardlike/main'},
      { name: '谁关注我', num: 0, image: config.apimg + "/image/card/chang.png", url: '../cardguanzhu/main' }
    ],
    userinfo:[],
    painting:{},
    shareImage:'',
    qcode:'',
    maskmodel:false
    }
  },

  components: {
  
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题中显示加载
    this.onloads();
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500)
  },

            //发送名片给好友
        onShareAppMessage: function () {
          if(!this.boxbool){
            let that=this;
            console.log('名片分享')
            let memberId = wx.getStorageSync('memberId');
            return {
            path: '/pages/cardinfo/main?memberId=' + memberId + '&cardid=' + that.userinfo.cardid,
            }
          }else{
            request.tip('你还没有设置名片','loading')
          }
           
        },


  methods: {
      onloads:function(){
        let that=this;
        let url ='/api/businessCard/getCardDate'
        let memberId = wx.getStorageSync('memberId') 
        let data = { memberId: memberId}
        console.log("==数据开请求==")
            request.moregets(url, data).then(function (res) {
            if (res.code==0){
                var num1 = 'list[0].num';
                var num2 = 'list[1].num';
                var num3 = 'list[2].num';
                    that.boxbool=false,
                    that.userinfo=res.CardDate, 
                    that.list[0].num=res.CardDate.clicks, 
                    that.list[1].num=res.CardDate.praise,
                    that.list[2].num=res.CardDate.attention,

                    //设置名片缓存
                    wx.setStorageSync('CardDate',res.CardDate)
               
                console.log('获取用户数据',res.CardDate);
            }
            })
        },

       //跳转背景页
        toyixia(){
          if(!this.boxbool){
             wx.navigateTo({ url: '../imgList/main' });
          }else{
            request.tip('你还没有提交信息','loading')
          }
       
        },

      //关闭海报
        guanbi:function(){
          let that=this;
          that.maskmodel=false
        },
        //跳转至名片信息提交
        tocardfrom:function(){
            wx.navigateTo({
            url: '../cardfrom/main',
            })
        },
        
          //跳转
        tonext:function(url,name){
            let that=this;
            // let url = e.currentTarget.dataset.url; //获取跳转路径
            // let name = e.currentTarget.dataset.name; 
            let memberId = wx.getStorageSync('memberId')
            wx.navigateTo({
            url: url + '?name=' + name + '&cardid=' + that.userinfo.cardid + '&memberId=' + memberId,
            })
        },
         //生成海报
  eventDraw:function() {
    //请求小程序码
    let that=this;
    that.maskmodel=true;
    let url ='https://www.guqinet.com:8444/uploadZhaoshang/getShare'
    let data = { page: 'pages/cardinfo/main', scene: wx.getStorageSync('memberId')}
    request.gets(url, data).then(function(res){
      console.log('kk',res);
      wx.showLoading({
          title: '绘制分享图片中',
          mask: true
        }),
      request.getImageInfo(res).then(function(res){
            that.painting={
              width: 375,
              height: 360,
              clear: true,
                   views: [
                {
                  type: 'image',
                  url: '/static/images/cardbg.png',
                  top: 0,
                  left: 0,
                  width: 375,
                  height: 360
                },
                {
                  type: 'image',
                  url: that.face,
                  top: 40,
                  left: 300,
                  width: 40,
                  height: 40
                },
                {
                  type: 'image',
                  url:res ,
                  top: 250,
                  left: 270,
                  width: 100,
                  height: 100
                },
                {
                  type: 'image',
                  url: '/static/images/avatar_cover.png',
                  top: 40,
                  left: 300,
                  width: 40,
                  height: 40
                },
                {
                  type: 'text',
                  content: that.userinfo.cardname,
                  fontSize: 30,
                  color: '#666',
                  textAlign: 'left',
                  top: 35,
                  left: 38,
                },
                {
                  type: 'text',
                  content: that.userinfo.departments + "  " + that.userinfo.jobs,
                  fontSize: 14,
                  color: '#8e8e8e',
                  textAlign: 'left',
                  top: 75,
                  left: 38,
                },
                {
                  type: 'text',
                  content: that.userinfo.companys,
                  fontSize: 14,
                  color: '#8e8e8e',
                  textAlign: 'left',
                  top: 100,
                  left: 38,

                },
                {
                  type: 'text',
                  content: '地址：' + that.userinfo.region,
                  fontSize: 13,
                  color: '#666',
                  textAlign: 'left',
                  top: 135,
                  left: 38,

                },
                {
                  type: 'text',
                  content: '电话：' + that.userinfo.p1,
                  fontSize: 13,
                  color: '#666',
                  textAlign: 'left',
                  top: 155,
                  left: 38,
                },

                {
                  type: 'text',
                  content: '获取等多人脉',
                  fontSize: 20,
                  color: '#666',
                  textAlign: 'left',
                  top: 275,
                  left: 38,
                },
                {
                  type: 'text',
                  content: '请关注微鑫云臻',
                  fontSize: 16,
                  color: '#666',
                  textAlign: 'left',
                  top: 305,
                  left: 38,
                },
              ]
            }
   
      })
      console.log('小程序码', that.data.qcode)
    })
  },
    eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  eventGetImage(event) {
    console.log("执行了吗")
    console.log(event)
    wx.hideLoading()
    console.log("s99",event)
    console.log("s88",event.mp.detail)
    const { tempFilePath, errMsg } = event.mp.detail

    if (errMsg === 'canvasdrawer:ok') {
        this.shareImage=tempFilePath
    }
  }


  },

  created () {
   
  },
  onShow(){
   this.onloads();
  },
  onLoad(){
      this.face=wx.getStorageSync('face');
      console.log("获取连接",config.apimg)
  }
}
</script>

<style scoped>
page{background: #fff;}


.container{padding: 30rpx;}
.warpBox{margin-top: 40rpx;position: relative;border-radius: 15rpx;overflow: hidden;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);width: 100%;}
.box1{z-index: 2;position: relative;display: flex;align-items: center;justify-content: center;flex-direction: column;height: 460rpx; }
.box1 text{font-size: 32rpx;color: #8e8e8e;font-weight: 100;}
.boxbg{position:absolute;top: 0;left: 0;width: 100%;z-index: 1}
.boxbg image{width: 100%;height: 460rpx;}
.box01btn{
  border-radius: 40rpx;
  font-weight: 200;
  color: #666;
  font-size: 34rpx;
  border:1px solid #666;padding-left: 30rpx;padding-right:30rpx;
  height: 70rpx;line-height: 70rpx;
  margin-top: 25rpx;
}

.box2{height: 290rpx;padding: 35rpx;padding-top: 50rpx;z-index: 2;position: relative;}
.box2top{display: flex;}
.box2top .right image{
height: 80rpx;width: 80rpx;border-radius: 50%;
}
.box2top .left,.right{width: 50%;}
.box2top .left text{color: #8e8e8e;font-size: 26rpx;font-weight: 200;margin-right: 25rpx;}
.box2top .name{font-size: 50rpx;color: #666;font-weight: 100;}
.box2top .gs{font-size: 26rpx;color: #666;padding-top: 8rpx}
.dizhi{font-size:26rpx;color: #666;padding-top: 10rpx; }
.phone{font-size:26rpx;color: #666;padding-top: 10rpx;}
.phone text{color: #ff7903;}
.box2top .right{display: flex;justify-content: flex-end;}

.itemwarp{display: flex;justify-content:space-around;padding-top: 48rpx;padding-bottom: 48rpx;
background: #f4f8fb;
}
.item{display: flex;flex-direction: column;align-items: center;}
.item text{font-size: 30rpx;font-weight: 100;color: #8e8e8e;margin-top: 10rpx;}
.item image{width: 46rpx;height: 50rpx;}
.warpbtn .btn{margin: auto;background: #ff7903;color: #fff;border-radius: 50rpx;
height: 80rpx;line-height: 80rpx;
}

.btnwrp{width: 100%;margin-top: 90rpx;}
.haibao,.warpbtn{text-align: center;width: 90%;margin:0 auto 30rpx;}
.haibaobtn{margin: auto;color: #8e8e8e;border-radius: 50rpx;
height: 80rpx;line-height: 80rpx;border:1px solid #8e8e8e;}

/* 海报样式 */
.canvas{z-index: 10;position: absolute;top: 0;left: 0;background: rgba(0, 0, 0, 0.600);height: 100vh;width: 750rpx;}
/* .model{height: 700rpx;width: 100%;} */
.model{width: 750rpx;}
.model image{width:750rpx;height: 720rpx;}

.modelbtn{width: 85%;line-height: 75rpx;background:#ff7903;color:#fff;margin: auto;text-align: center;margin-top: 60rpx;border-radius: 20rpx;}
.modelcard{padding-top: 95rpx;}
.modelbtntop{margin-top: 40rpx;}

</style>