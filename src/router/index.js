import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Book from '@/components/Book'
import PageOne from '@/components/PageOne'
import PageTwo from '@/components/PageTwo'

import Index from '@/components/Index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '图书管理',
      redirect:'/pageOne',
      component: Index,
      children:[
        {
          path:'/pageOne',
          name:'图书查询',
          component:PageOne,

        },
        {
          path:'/pageTwo',
          name:'添加图书',
          component:PageTwo
        },

      ]
    }
  ]
})
