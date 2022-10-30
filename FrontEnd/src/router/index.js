import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Main from '../view/main/MainPage.vue'
import LogIn from '../view/login/LoginPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn,
    },
    {
      path: '/hello',
			name: 'HelloWorld',
      component: HelloWorld
    },
		{
      path: '/main',
			name: 'Main',
      component: Main
    },
  ]
})