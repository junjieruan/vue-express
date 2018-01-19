import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/components/MainPage'
import SendBooking from '@/components/SendBooking'
import OrderList from '@/components/OrderList'
import OrderDetail from '@/components/OrderDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'MainPage',
      component: MainPage,
      children:[
        {
          path:'/sendBooking',
          component:SendBooking
        },
        {
          path:'/orderEntry/:type',
          component:OrderList
        },
        {
          path:'/orderDetail/:id',
          component:OrderDetail
        }
      ]
    }
  ]
})
