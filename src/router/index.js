import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Main from '@/components/Main'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      props: true,
      beforeEnter:(to, from, next) => {
        if(to.params.zip)
        {
          next();
        }
        else 
        {
          next({
            name: 'Welcome'
          })
        }
      }
    },
  ]
})
