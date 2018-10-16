<template>
  <div class="intro_root">
    <div class='top'>
      <div v-for='(item,index) in listtop' :index='index' :key='item' :class="item.topbool?'active':''"  class="item"  @click='seleclickTab(index)' >{{item.names}}</div>
    </div>


    <div class='renqi' v-if="bartitle=='我的人气'" >
    <div class='listwarp' v-if='indexs==0'>
    <div class='list' @click='tocardinfo(item.cardid,item.lookmemberid)' v-for='(item,index) in whoLookMe' :index='index' :key='item'>
      <div class='listitem'>
      
      <div class='info'>
        <div class='infoimg'><image :src='item.face'></image></div>
        <div class='infoname'><text>{{item.nickName?item.nickName:item.uname}}</text><!--<text class='tishi'>{{item.cardName}}</text>-->
          <text class='time'>{{item.looktime}}</text>
        </div>
        <!-- <div class='infoweixing'><image src='{{weiimg}}'></image></div> -->
      </div>
      </div>
    </div>
    </div>


    <div class='listwarp' v-if='indexs==1'>
    <div class='list' @click='tocardinfo(item.cardid,item.mermberId)' v-for='(item,index) in iLook' :index='index' :key='item'>
      <div class='listitem'>
      <div class='info'>
        <div class='infoimg'><image :src='item.cardImg'></image></div>
        <div class='infoname'><text>{{item.cardName}}</text><!--<text class='tishi'>{{item.cardName}}</text>-->
          <text class='time'>{{item.looktime}}</text>
        </div>
        <!-- <div class='infoweixing'><image src='{{weiimg}}'></image></div> -->
      </div>
      </div>
    </div>
    </div>
    </div>

    <div class='dianzan' v-if="bartitle=='我的点赞'" >
    <div class='listwarp' v-if='indexs==0' >
    <div class='list' @click='tocardinfo(item.cardid,item.likememberid)' v-for='(item,index) in wholikeme' :index='index' :key='item' >
      <div class='listitem'>
      <div class='info'>
        <div class='infoimg'><image :src='item.face'></image></div>
        <div class='infoname'><text>{{item.nickName?item.nickName:item.uname}}</text><!--<text class='tishi'>{{item.cardName}}</text>-->
            <text class='time'>{{item.liketime}}</text>
        </div>
        <!-- <div class='infoweixing'><image src='{{weiimg}}'></image></div> -->
      </div>
      </div>
    </div>
    </div>


    <div class='listwarp' v-if='indexs==1'>
    <div class='list' @click='tocardinfo(item.cardid,item.mermberId)' v-for='(item,index) in ilike' :index='index' :key='item'>
      <div class='listitem' >
      <div class='info'>
        <div class='infoimg'><image :src='item.cardImg'></image></div>
        <div class='infoname'><text>{{item.cardName}}</text><!--<text class='tishi'>{{item.cardName}}</text>-->
            <text class='time'>{{item.liketime}}</text>
        </div>
        <!-- <div class='infoweixing'><image src='{{weiimg}}'></image></div> -->
      </div>
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
      likebool:true,
      listtop: [{ names: '谁看过我', topbool: true }, { names: '我看过谁', topbool: false }],
      weiimg: config.apimg + "/image/card/weixin.png",
      indexs:0,
      face:'',
      bartitle:'',
      listfont:'',
      wholikeme:[],
      ilike:[],
      whoLookMe:[],
      iLook:[]
    }
  },

  components: {
    
  },

  methods: {

      //获取初始化数据
  onloads:function(){
    let that=this;
    let bartitle = that.bartitle;
    console.log(bartitle,'7777');
    if (bartitle=='我的人气'){ //获取人气数据
      let url ='/api/businessCard/renqiClick'
      let data = { cardId: that.cardid, memberId: that.memberId}
      that.more(url, data, function (res) {
          that.whoLookMe=res.whoLookMe,
          that.iLook=res.iLook
        console.log('888', that.iLook);
      })

    } else if (bartitle=='我的点赞'){ //获取点赞数据
      // var str1 = 'listtop[0].names'
      // var str2 = 'listtop[1].names'
        that.listtop[0].names='谁赞过我',
        that.listtop[1].names='我赞过谁'

      let url = '/api/businessCard/dianzanClick'
      let data = { cardId: that.cardid, likeMemberId: that.memberId }
      that.more(url, data,function(res){
        console.log(888,res)
          that.wholikeme=res.whoLikeMe,
          that.ilike=res.iLike,

        console.log('666',res);
      })
    }
  },

  //请求方法
  more:function(url,data,callback){
    request.moregets(url, data).then(function (res) {
      console.log(res, '获取数据')
      callback(res)
    })
  },

  //选中方法
  seleclickTab:function(index){
      let that=this;
      let indexs = index;
      that.listtop.forEach(function(item,index,arr){
        // var str = 'listtop[' + index +'].topbool'
        if (indexs==index){
            that.listtop[index].topbool= true,
            that.indexs= indexs
        }else{
            that.listtop[index].topbool= false
        }
      })
    },

   //跳转至名片详情页
   tocardinfo:function(cardid,merberid){
        let that=this;
        console.log(cardid, merberid)
        wx.navigateTo({
          url: '../cardinfo/cardinfo?cardid=' + cardid + '&memberId=' + merberid,
        })
      }
  },

  created () {
   
  },

  onShow:function(){
    //加载初始化数据
    this.onloads();    
  },

  onLoad: function (options) {
    let that=this;
    //设置标题
    wx.setNavigationBarTitle({
      title: options.name
    })
    let memberId = wx.getStorageSync('memberId');
      that.face=wx.getStorageSync('face'),
      that.bartitle=options.name,
      that.cardid=options.cardid,
      that.memberId=memberId
  }
}
</script>

<style scoped>
page{background: #fff;}
.top{
  display: flex;justify-content: space-around;padding-top: 15rpx;padding-bottom: 15rpx;border-bottom: 1px solid #e9e9e9;
}
.top .active{color: #000;}

.item{font-size: 32rpx;color: #8e8e8e;}

.list{padding: 15rpx 30rpx; }
.time{font-size: 28rpx;font-weight: 100;color: #8e8e8e;margin-top: 20rpx;}
.info{display: flex;margin-top: 15rpx;border-bottom: 1px solid #e9e9e9;}
.infoimg{width: 165rpx;text-align: center;}
.infoimg image{width: 120rpx;height: 120rpx;border-radius: 50%;}
.infoweixing{width:120rpx;}
.infoname{padding-top: 10rpx;flex-grow:1;}
.infoname text{display: block;font-size: 30rpx;font-weight: 100;color: #8e8e8e;}
.infoname .tishi{color: #ccc;padding-top: 16rpx;}
.infoweixing{display: flex;}
.infoweixing image{width: 55rpx;height: 50rpx;align-self:center;}
</style>