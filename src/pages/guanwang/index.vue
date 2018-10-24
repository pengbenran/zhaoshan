<template>
  <div class="index_root">
       <view class="container">
    <view class="pageH5">
      <web-view src="http://www.guqinet.com/"></web-view>
    </view>
  </view>
  </div>
</template>

<script>
import config from '../../config'
import request from '../../utils/request'

export default {
  data () {
    return {
  

    }
  },

  components: {
    
  },
   onLoad:function(){
   

  },
  methods: {
  
  
    


  },

  created () {
   
  },

  onShareAppMessage: function () {
    return {
      title: '微鑫云开发招商',
      desc: '小程序招商开发',
      path: 'pages/index/main'
    }
  }
}
</script>

<style scoped>

</style>