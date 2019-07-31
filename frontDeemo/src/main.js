import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router/router'
import store from './store/index'
import { _get, _post, _throttle, _debounce,_postFormdata } from './tools/utils'
import '../static/css/main.css'

Vue.prototype.$get = _get;
Vue.prototype.$post = _post;
Vue.prototype.$postFormdata = _postFormdata;
Vue.prototype.$throttle = _throttle;
Vue.prototype.$debounce = _debounce;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

document.meta="2234"
