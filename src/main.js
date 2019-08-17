import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import '@/assets/css/global.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render(h) { return h(App); }
}).$mount('#app');