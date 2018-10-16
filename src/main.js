import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main', 'pages/BusinessScope/main',
     'pages/intro/main', 'pages/presentation/main','pages/presentationdetail/main','pages/excellent/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '谷琴科技',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      "selectedColor":"#FD983E",
  "list": [
    {
            pagePath: "pages/index/main",
            iconPath: "/static/images/home.png",
            selectedIconPath: "/static/images/home1.png",
            text: "首页"
          },
          {
            pagePath: "pages/BusinessScope/main",
            iconPath: "/static/images/see.png",
            selectedIconPath: "/static/images/see1.png",
            text: "公司"
          },
          {
            pagePath: "pages/presentation/main",
            iconPath: "/static/images/find.png",
            selectedIconPath: "/static/images/find1.png",
            text: "资讯"
          },
          {
            pagePath: "pages/intro/main",
            iconPath: "/static/images/myself.png",
            selectedIconPath: "/static/images/myself1.png",
            text: "服务"
          }
  ]
}
  }
}
