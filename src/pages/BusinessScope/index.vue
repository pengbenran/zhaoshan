<template>
  <div class="scope_root">
    <div class="scopelist" v-for="item in business" :index="index" :key="key"> 
      <div class="scopelistImg" :style="{width:imageWidth,height:imageWidth}">
        <image :src="item.imgUrl" alt=""/>
      </div>
       <div class="scopetitle">{{item.name}}</div>
    </div>   
  </div>
</template>

<script>
export default {
  data() {
    return {
      business:[
        {imgUrl:'https://shop.guqinet.com/html/images/zs/26.jpg',name:'小程序开发'},
        {imgUrl:'https://shop.guqinet.com/html/images/zs/5.jpg',name:'app订制'},
        {imgUrl:'https://shop.guqinet.com/html/images/zs/3.jpg',name:'企业公众号服务'},
        {imgUrl:'https://shop.guqinet.com/html/images/zs/17.jpg',name:'H5与网络建设'},
        {imgUrl:'https://shop.guqinet.com/html/images/zs/22.jpg',name:'大数据平台搭建'},
        {imgUrl:'https://shop.guqinet.com/html/images/zs/18.jpg',name:'SEO优化'}
        ],
      imageWidth:''};
  },

  components: {},
  onLoad:function(){
    var that=this;
    var imageWidth=(wx.getSystemInfoSync().windowWidth-20)/2+"px";
    that.imageWidth=imageWidth;

    
  },
  methods: {},

  created() {},
  onShareAppMessage: function() {
    return {
      title: "微鑫云开发招商",
      desc: "小程序招商开发",
      path: "pages/BusinessScope/main"
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
.scope_root {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.scopelist {
  width: 50%;
}
.scopelistImg {
  width: 180px;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
}
.scopetitle {
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  color: #3b83e3;
}
</style>
