import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios

const store = new Vuex.Store({
  state:{
    email: '',
    userName: '',
  },
  mutations:{
    changeEmail(state, data){
      state.email = data
    },
    changeUserName(state, data) {
      state.userName = data
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
