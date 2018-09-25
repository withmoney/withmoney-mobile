import Vue from 'vue';
import 'moment/locale/pt-br';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
