<template>
  <div class="intro_root">
     <div class='top'>
  <text>完善个人名片的用户，更容易收获商业人脉，</text>
   <text>并得到拼台名片榜单推荐</text>
</div>
<div class='face'><image :src='face'></image></div>
<div class='subwarp'>
  <form @submit='fromsub'>
    <div class='item'><text>姓名</text> 
      <input type='text' placeholder="必填" name='name' placeholder-style='color:#ccc;font-size:30rpx;' />
    </div>
     <div class='item'><text>电话</text> 
      <input type='text' placeholder="请输入电话" name='dh' placeholder-style='color:#ccc;font-size:30rpx;' />
    </div>
        <div class='item'><text>公司</text> 
      <input type='text' placeholder="请输入公司名称" name='gs' placeholder-style='color:#ccc;font-size:30rpx;' />
    </div>
        <div class='item'><text>部门</text> 
      <input type='text' placeholder="请输入部门" name='bm' placeholder-style='color:#ccc;font-size:30rpx;' />
    </div>
        <div class='item'><text>职位</text> 
      <input type='text' placeholder="必填" name='zw' placeholder-style='color:#ccc;font-size:30rpx;' />
    </div>
        <div class='item'><text>我负责</text> 
      <input type='text' placeholder="一句话介绍你负责的具体业务" name='wofuze' placeholder-style='color:#ccc;font-size:30rpx;' />
    </div>
       <div class='item'><text>所在地</text> 
      <input type='text' :value='address' placeholder="请填写您的所在地址" name='address' placeholder-style='color:#ccc;font-size:30rpx;' />
      <text class='addres' @click='bindaddress'>设置定位</text>
    </div>
      <div class='item'><text>行业</text> 
      <input type='text' placeholder="请选择行业" name='hy' placeholder-style='color:#ccc;font-size:30rpx;' />
    </div>
    
    <div class='btnwarp'>
      <button formType="submit">保存</button>
    </div>
  </form>
</div>

  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'


export default {
  data () {
    return {
         face:'',
         address:''
    }
  },

  components: {
    
  },

  methods: {
      //定位获取所在地
  bindaddress:function(){
      var that = this;
      wx.chooseLocation({
        success: function (res) {
          // success
          console.log(res)
            that.address=res.address
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    },


//表单提交数据
  fromsub:function(s){
    let businesscardDo={}
    let e=s.mp;
    let parms = {}
    let url ='/api/businessCard/submitDate'
    //获取memberId
    let memberId = wx.getStorageSync('memberId');
    parms.mermberid = memberId
    parms.cardname = e.detail.value.name
    parms.companys = e.detail.value.gs
    parms.departments = e.detail.value.bm
    parms.jobs = e.detail.value.zw
    parms.contents = e.detail.value.wofuze
    parms.region = e.detail.value.address
    parms.industry = e.detail.value.hy
    parms.p1 = e.detail.value.dh
    businesscardDo.businesscardDo = parms;
    console.log(businesscardDo);
    //判断数据是否为空
    if (e.detail.value.name==''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'loading'
      })
    } else if (e.detail.value.gs == ''){
      wx.showToast({
        title: '公司不能为空',
        icon: 'loading'
      })
    } else if (e.detail.value.bm == '') {
      wx.showToast({
        title: '部门不能为空',
        icon: 'loading'
      })
    } else if (e.detail.value.zw == '') {
      wx.showToast({
        title: '职位不能为空',
        icon: 'loading'
      })
    } else if (e.detail.value.wofuze == '') {
      wx.showToast({
        title: '职责不能为空',
        icon: 'loading'
      })
    } else if (e.detail.value.address == '') {
      wx.showToast({
        title: '地址不能为空',
        icon: 'loading'
      })
    } else if (e.detail.value.hy == '') {
      wx.showToast({
        title: '行业不能为空',
        icon: 'loading'
      })
    } else if (e.detail.value.dh == ''){
      wx.showToast({
        title: '电话不能为空',
        icon: 'loading'
      })
    }
    else{
      //请求提交数据

      let msg = request.post(url, JSON.stringify(businesscardDo))
      msg.then(function (res) { 
        if (res.code==0){
          request.showSuccess('保存成功','../mycard/main')
        }
      })
    }
    

  }
  },

  created () {
   
  },
  onLoad:function(options){
    this.face=wx.getStorageSync('face')
  }

}
</script>

<style scoped>
page{background: #fff;}
.top{text-align: center;background: #feebda;padding-top: 15rpx;padding-bottom: 15rpx}
.top text{color: #fb6e27;font-size: 30rpx;display: block;}

.face{display: flex;justify-content: center;margin-top: 30rpx;}
.face image{width: 120rpx;height: 120rpx;border-radius: 50%;}

.subwarp{padding: 25rpx 35rpx 0;}
.item{display: flex;align-items: center;height: 95rpx;line-height: 95rpx;border-bottom: 1px solid rgb(240, 240, 240);}
.item text{font-size: 35rpx;width: 160rpx;padding-left: 10rpx;}
.item input{font-size: 32rpx;color: rgb(139, 139, 139);}

.btnwarp{width: 100%;margin-top: 50rpx;}
.btnwarp button{width: 90%;margin: auto;background: #ff7903;color: #fff;
text-align: center;height: 85rpx;line-height: 85rpx;border-radius: 40rpx;}
.item .addres{background:#ff7903;padding-left: 0;font-size: 24rpx;border-radius: 30rpx;text-align: center;color: #fff;display: inline-block;height: 40rpx;line-height: 40rpx;}
</style>