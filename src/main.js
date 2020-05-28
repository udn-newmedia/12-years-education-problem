import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { rwdMethods } from '@/mixins/masterBuilder.js';
import myDebugger from '@/utils/debugger.js';
import 'intersection-observer';

import '~/style/main.scss';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  mixins: [rwdMethods]
}).$mount('#app')

/* 解決 rec.udn.com追蹤碼 佔位問題 */
window.onload = () => {
  document.getElementsByTagName('iframe')[0].style.top = 0;
};

/* debugger */
window.addBorder = myDebugger.addBorder;
window.removeBorder = myDebugger.removeBorder;