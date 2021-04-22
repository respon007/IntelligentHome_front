import Vue from 'vue'
import Router from 'vue-router'
import IntelligentHome from '@/components/IntelligentHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IntelligentHome',
      component: IntelligentHome
    }
  ]
})
