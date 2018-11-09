import config from '../config'
//封装一个POST请求
const  post=(url,data)=>{
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.host + url,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method:'post',
        data: {
          params: data
        },
        success: res => {
          if (res.data.code == 0) {
            resolve(res.data)
            console.log(res.data.data)
          } else {
            reject(res.data)
            console.log('请求失败')
          }
        },
      });
    })
  }
  
//封装一个get请求
const gets = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url:url,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      data: data,
      success: res => {
        resolve(res.data)
      },
    });
  })
}

  // 时间戳转换
  const  timestampToTime =(timestamp)=> {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y+M+D+h+m+s;
}
  
  //封装多个get请求
  const moregets = (url, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.host + url,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method: 'get',
        data: data,
        success: res => {
          resolve(res.data)
        },
      });
    })
  }
  
  //封装提示
  const tip=(text,icon)=>{
    wx.showToast({
      title: text,
      icon: icon,
      duration: 2000
    })
  }
  
  //封装一个弹出提示
  const showSuccess=(text,url)=>{
    wx.showToast({
      title: text,
      icon: 'loading',
      duration:2000
    })
    setTimeout(function(){
      wx.switchTab({
        url: url,
      })
    }, 2000);
  }
  
  //封装一个模拟框
  const showModels=(text,url01,url02)=>{
    wx.showModal({
      title: '提示',
      content: text,
      success:function(res){
        if(res.confirm){
          console.log('调用——确定')
          wx.switchTab({
            url: url01,
          })
        } else if (res.cancel){
          console.log('调用-取消') 
          wx.switchTab({
            url: url02,
          })
        }
      }
    })
  }
  
 
  //缓存图片
  function locaImg(v){
    return new Promise(function (resolve, reject) { 
      wx.getImageInfo({   //  小程序获取图片信息API
        src: v,
        success: function (res) {
          // locaArr.push(res.path)
          resolve(res.path) 
        }
      })
    })
  }
  async function getlocaImg(arr){
       let locaArr=[];
      for(var i=0;i<arr.length;i++){
        locaArr.push(await locaImg(arr[i]))
      }
      return locaArr
  }

  const getImageInfo=(arrimg)=>{    //  图片缓存本地的方法
    return new Promise(function (resolve, reject) { 
      resolve(getlocaImg(arrimg))
    })
  }
  
 const request={
    post,
    moregets,
    gets,
    tip,
    showSuccess,
    showModels,
    getImageInfo,
    timestampToTime
 }

 export default request