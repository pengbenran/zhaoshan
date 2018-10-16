<template>
  <div class="intro_root">
    <div class="intro_img">
      <image src="/static/images/company.jpg" alt=""/>
    </div>
    <div class="content">
      上海谷琴电子科技有限公司是一家集设计、研发、生产、销售为一体的新型互联网公司。
      公司于2014年成立，我们有专业的销售和技术团队，我们始终为客户提供好的产品和技术支持、健全的售后服务，
      推出适应市场需求的硬件及软件产品，如果您对我公司的产品服务有兴趣，期待您的来电咨询。
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
     
    }
  },

  components: {
    
  },

  methods: {
    
  },

  created () {
   
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
image{
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
</style>