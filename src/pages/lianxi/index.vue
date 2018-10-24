<template>
  <div class='mapwarp'>
      <map
      id="myMap"
      style="width: 100%; height: 420px;"
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
      :covers="covers"
      show-location
    ></map>

    <div class="list">
      <div class="cominfo"><i class="fa fa-location-arrow" aria-hidden="true"></i> 南昌市西湖区洪城数码广场A栋1101</div>
     <div class="item itemlist"><i class="fa fa-paper-plane-o" aria-hidden="true"></i> <navigator url="../guanwang/main" class="papaa">公司官网：http://www.guqinet.com/ </navigator>    </div>
      <div class="item"><i class="fa fa-phone" aria-hidden="true"></i> 联系电话： 400-155-7100</div>
    </div>

 
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
  },

  data () {
    return {
        latitude: 28.665697,
        longitude: 115.907211,
        markers: [{
        id: 1,
        latitude: 28.665697,
        longitude: 115.907211,
        content: '谷琴',
        iconPath:'/static/images/location.png'
        }],
       
    }
  },

  created () {
 
  }
}
</script>

<style>
.mapwarp{min-height: 100vh;background: #f1f1f1;}

.list{padding: 5rpx 0rpx}
.cominfo{text-align: center;font-size: 30rpx;font-weight: 100;color: #666;background: #e6e6e6}
.item{line-height: 75rpx;font-weight: 100;background: #fff;padding: 8rpx 20rpx;font-size: 32rpx;}
.itemlist navigator{display: inline-block;}
</style>
