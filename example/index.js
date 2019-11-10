import Vue from 'vue/dist/vue.esm';
import App from './App';
import R3shaper from '../src';

Vue.component('r3shaper', R3shaper);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
