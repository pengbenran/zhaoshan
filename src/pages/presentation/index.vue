<template>
  <div class="presen_root">
    <div class="presen_content">
      <div class="presen_list" v-for="(item,index) in presenImg" :key="key" :index="index" @click="godetail(index)">
        <div class="preImg" :style="{width:imageWidth,height:imageWidth}">
          <image :src="item.Img" alt=""/>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageWidth:'',
      presenImg: [
        {
          Img: "https://shop.guqinet.com/html/images/zs/fc.png",
          urlImg: "https://shop.guqinet.com/html/images/zs/fc1.png",
          ewmImg: "https://shop.guqinet.com/html/images/zs/hourse.png"
        },
        {
          Img: "https://shop.guqinet.com/html/images/zs/yq.png",
          urlImg: "https://shop.guqinet.com/html/images/zs/yqd.png",
          ewmImg: "https://shop.guqinet.com/html/images/zs/paint.png"
        },
        {
          Img: "https://shop.guqinet.com/html/images/zs/sm.png",
          urlImg: "https://shop.guqinet.com/html/images/zs/sm1.png",
          ewmImg: "https://shop.guqinet.com/html/images/zs/Digital.png"
        },
        {
          Img: "https://shop.guqinet.com/html/images/zs/qc.png",
          urlImg: "https://shop.guqinet.com/html/images/zs/qc1.png",
          ewmImg: "https://shop.guqinet.com/html/images/zs/equipment.png"
        },
        {
          Img: "https://shop.guqinet.com/html/images/zs/mr.png",
          urlImg: "https://shop.guqinet.com/html/images/zs/mr1.png",
          ewmImg: "https://shop.guqinet.com/html/images/zs/Beauty.png"
        }
      ]
    };
  },

  components: {},
  onLoad:function(){
    var that=this;
    var imageWidth=(wx.getSystemInfoSync().windowWidth-20)/2+"px";
    that.imageWidth=imageWidth;
    
  },
  methods: {
    godetail: function(index) {
      var that = this;
      wx.navigateTo({
        url:
          "../presentationdetail/main?urlImg=" +
          that.presenImg[index].urlImg +
          "&ewmImg=" +
          that.presenImg[index].ewmImg
      });
    }
  },

  created() {},
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
image {
  width: 100%;
  height: 100%;
  display: block;
}
.presen_content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.preImg {
 margin: 0 auto;
  overflow: hidden;
}
.presen_list {
  width: 50%;
  margin-bottom: 10px;
}
</style>