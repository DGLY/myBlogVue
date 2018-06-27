import Vue from 'vue'
import Router from 'vue-router'
import guidePage from '../components/guidePage/guidePage'
import homePage from '../components/homePage/homePage'
import myBlog from '../components/myBlog/myBlog'
import tools from '../components/toolsBox/tools'
import subscribe from '../components/subscribeMe/subscribe'
import connect from '../components/connectMe/connect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '主页',
      component: guidePage,
    },
    {
      path: '/homePage',
      name: '主页',
      component: homePage,
    },
    {
      path: '/blog',
      name: '多个领域的博客',
      component: myBlog
    },
    {
      path: '/tools',
      name: '工具箱',
      component: tools
    },
    {
      path: '/subscribe',
      name: '订阅我',
      component: subscribe
    },
    {
      path: '/connect',
      name: '联系我',
      component: connect
    }
  ]
})
