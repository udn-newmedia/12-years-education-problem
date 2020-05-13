import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { rwdMethods } from '@/mixins/masterBuilder.js';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mixins: [rwdMethods]
}).$mount('#app')

// rec.udn.com追蹤碼
window.onload = () => {
  document.getElementsByTagName('iframe')[0].style.top = 0;
};