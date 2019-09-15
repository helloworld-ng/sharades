import Vue from 'vue';
import Game from './Game.vue';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Game),
}).$mount('#game');
