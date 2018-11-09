<template>
  <div class="imgwarp">
    <div class="title topTitle"><span><text>图片分类</text></span> <small>右滑查看更多 <i class="fa fa-angle-double-right" aria-hidden="true"></i></small></div>
     <div class="fenList">
         <span v-for="(item,index) in TypeList" :index='index' 
                                                :key='item' 
                                                @click="typeselect(item.id,index)"
                                                :class="typeselsectindex==index?'typeactive':'active1'">{{item.typeName}}</span> 
     </div>
     <div class="title">
         <scroll-view class="crollwarp" scroll-x style="height: 314rpx;"  v-if="imgUrl.length!=0">
            <div class="scroll-item"   v-for="(item,index) in imgUrl" 
                                      :index='index' 
                                      :key='item' 
                                      @click="selctTo(index,item.imgUrl)" 
                                      :class="selectindex==index+1? 'active':'active1'">
                <img :src="item.imgUrl" mode="aspectFit">
                <div class="mask"><div class="imgwarp"><img :src="imgico"></div></div>
            </div>
         </scroll-view>
          <div class="showHide" v-else> <i class="fa fa-paper-plane-o" aria-hidden="true"></i>   抱歉，暂无数据~~~~</div>
     </div>

    <div class="title"><span><text>动态发布</text></span></div>
    <div class="coantainer"></div>
    <div class="from-model">
         <textarea bindblur="bindTextAreaBlur" placeholder="请输入你的心情~~·" maxlength='30'
          v-model="textarea" placeholder-style='color:#ccc;font-size:30rpx;'   />
    </div>

     <div class="btn"><small>注：最多输入30个字符</small> <span @click="haibaoClick">生成海报</span></div>

      <div class='canvas' v-if='maskmodel'>
      <div class='modelcard'>
        <div class='model'>
          <!-- <image :src="shareImage" class="share-image"></image> -->
          <canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"/>
        </div> 
        <!-- <div class='modelbtn'  @click="eventSave">保存本地</div>
        <div class='modelbtn modelbtntop' @click='guanbi'>关闭</div> -->
        </div>
      </div>
      <!--海报样式 end-->
  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'

export default {
  data () {
    return {
      imgUrl:[] ,
      imgico:config.imgurl+'selsctico.png',
      TypeList:[],
      selectindex:0,
      typeselsectindex:0,
      maskmodel:false,
      userinf:{},
      shareImage:'',
      painting:{},
      face:'',
      textarea:'',
      selectimg:''
      
    }
  },

  components: {
    
  },

  methods: {
   //动画事件
   selctTo(index,imgurl){
     console.log(index);
     let that=this;
     that.selectindex=index+1;
     that.selectimg=imgurl;
   },

  //海报生成点击
  haibaoClick(){
    let that=this;
    if(that.selectindex!=0){
      that.eventDraw();
    }else{
      request.tip("请选择一张图片","loading")
    }
  },
 
 //获取图片类型
 async ImgType(){
   let that= this;
   const res = await request.moregets('/api/businessCard/albumTypeList')
   that.TypeList=res.albumTypeList
   //初始化加载图片
    that.ImgList(that.TypeList[0].id)
 },

 //获取图片列表
 async ImgList(typeid){
   let that=this;
   const res = await request.moregets('/api/businessCard/getTpyeAlbum',{typeId:typeid})
   that.imgUrl = res.albumDOList
  //  console.log(res,"查看图片列表",that.TypeList[0]);
   console.log("输出类型长度",that.imgUrl.length)
 },

 //点击图片类型
 typeselect(typeid,index){
  let that = this;
  that.typeselsectindex=index;
  that.ImgList(typeid);
 },

 //生成海报
 async eventDraw() {
   console.log("进来了")
    //请求小程序码
    let that=this;
    that.maskmodel=true;
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    let url ='https://www.guqinet.com:8444/uploadZhaoshang/getShare'
    let data = { page: 'pages/cardinfo/main', scene: wx.getStorageSync('memberId')}
    // request.gets(url, data).then(function(res){})
    const ress=await  request.gets(url, data);
    console.log('kk',ress);
     let arrimg=[that.selectimg,ress]
     
     const Fimglist= await request.getImageInfo(arrimg);
     console.log("查看本地值",Fimglist,Fimglist[0],Fimglist[1])
    //  let str='你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界'
    //  console.log(str.slice(22),'字符长度') 
      that.painting={
        width: 375,
        height: 500,
        clear: true,
              views: [
          {type: 'image',url: Fimglist[0],top: 0,left: 0,width: 375,height: 500},
          {
            type: 'image',
            url: that.face,
            top: 385,
            left: 20,
            width: 48,
            height: 48
          },
          {
            type: 'image',
            url: Fimglist[1],
            top: 392,
            left: 295,
            width: 70,
            height: 70
          },
          {
            type: 'image',
            url: '/static/images/avatar_cover.png',
            top: 385,
            left: 20,
            width: 48,
            height: 48
          },
          {
              type: 'text',
              content: that.textarea,
              fontSize: 14,
              color: '#666',
              textAlign: 'left',
              breakWord: true,
              width: 305,
              top: 290,
              left: 35,
            }
            ,{
              type: 'text',
              content: that.userinf.cardname,
              fontSize: 23,
              color: '#666',
              textAlign: 'left',
              bolder: true,
              width: 80,
              top: 380,
              left: 70,
            },
            {
              type: 'text',
              content: that.userinf.departments+"  "+that.userinf.jobs,
              fontSize: 14,
              color: '#ccc',
              textAlign: 'left',
              width: 80,
              top: 388,
              left: 140,
            },
            {
              type: 'text',
              content: that.userinf.companys,
              fontSize: 14,
              color: '#ccc',
              textAlign: 'left',
              width: 80,
              top: 412,
              left: 70,
            },
            {
              type: 'text',
              content: "地址："+that.userinf.region,
              fontSize: 14,
              color: '#666',
              textAlign: 'left',
              width: 80,
              top: 440,
              left: 20,
            },
            {
              type: 'text',
              content: "电话："+that.userinf.p1,
              fontSize: 14,
              color: '#666',
              textAlign: 'left',
              width: 80,
              top: 460,
              left: 20,
            },
        ]
      }
      console.log('小程序码', that.data.qcode)
  },

    eventGetImage(event) {
      console.log("执行了吗")
      console.log(event)
      wx.hideLoading()
  
      console.log("s88",event.mp.detail)
      const { tempFilePath, errMsg } = event.mp.detail

      if (errMsg === 'canvasdrawer:ok') {
          this.shareImage=tempFilePath
          wx.previewImage({
            current: tempFilePath, // 当前显示图片的http链接
            urls: [tempFilePath] // 需要预览的图片http链接列表
          })
      }
    },

   //保存到本地
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

  },

   //页面加载完成设置一个动画实例
   onReady(){
    let that=this;
    that.animation=wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear',  
        delay: 100,
        transformOrigin: 'left top 0',
        success: function(res) {
          console.log(res)
        }
    })
   },

  //加载初始化数据
  onLoad(){
    let that=this;
    that.face=wx.getStorageSync('face');
    that.userinf=wx.getStorageSync('CardDate');
    that.ImgType()
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
img{
  width: 100%;
  height: 100%;
  display: block;
}
.intro_img{
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.content{
  width: 95%;
  margin: 10px auto;
  text-indent: 25px;
  color: #414141;
}

.crollwarp{ white-space:nowrap;display: block;height: 310rpx;overflow: hidden;}
.crollwarp div{width: 240rpx;border:1px solid #e0e0e0;height: 310rpx;display: inline-block;}
.crollwarp div:nth-child(even){border-left: none;border-right: none;}
.crollwarp div:last-child{border-right: 1px solid #e0e0e0;}
.title{padding: 20rpx 10rpx;}


.fenList{padding: 5rpx 15rpx; }
.scroll-item{position: relative;}
.fenList span{border:1px solid #ccc; font-size: 28rpx; color: #ccc; border-radius: 10rpx;padding: 10rpx 25rpx;margin-right: 15rpx;}

.crollwarp .mask{position: absolute;top: 310;left: 0;height: 99%;background: rgba(0, 0, 0, 0.11);transition: all .3s linear;}
.crollwarp  .active .mask{transform: translate3d(0,-310rpx,0)}
.mask img{height: 120rpx;width: 120rpx;padding-top: 95rpx;padding-left: 60rpx;}
/* .imgwarp{display: flex;justify-content: center;align-items: center;height: 100%;width: 100%} */

.title{ padding: 20rpx 15rpx;}
.title text{font-weight: 100;font-size:45rpx;padding-left: 16rpx;color: rgb(145, 145, 145);}
.title span{border-left: 10rpx solid #ff7903; }
.topTitle{display: flex;justify-content: space-between;align-items: center;}
.topTitle small{font-size: 22rpx;font-weight: 100;color: #666;}
.from-model{padding: 0 15rpx;}
textarea{font-size: 34rpx;color: #666;width: 100%;height: 130rpx;}

.btn{display: flex;justify-content: space-between;align-items: center;padding: 0 20rpx;}
.btn small{font-size: 26rpx;font-weight: 100;color: #666;}
.btn span{display: inline-block;background: #ff7903;height: 70rpx;line-height: 70rpx;padding: 0 45rpx;
border-radius: 30rpx;font-size: 28rpx;color: #fff;}

/* 海报样式 */
.canvas{z-index: 10;position: absolute;top: 0;left: 0;background: rgba(0, 0, 0, 0.000);
/* height: 100vh;width: 750rpx; */
}
/* .model{height: 700rpx;width: 100%;} */
.model{width: 750rpx;}
.model image{width:750rpx;height: 1000rpx;}

.modelbtn{width: 85%;line-height: 75rpx;background:#ff7903;color:#fff;margin: auto;text-align: center;margin-top: 60rpx;border-radius: 20rpx;}
.modelcard{padding-top: 95rpx;}
.modelbtntop{margin-top: 40rpx;}

.fenList .typeactive{background: #ff7903;border:1px solid #ff7903;color: #fff;}
.showHide{height: 314rpx;display: flex;justify-content: center;align-items: center;font-size: 36rpx;font-weight: 100;color: #ccc;}
.showHide i{font-size: 45rpx;margin-right: 10rpx;}


</style>