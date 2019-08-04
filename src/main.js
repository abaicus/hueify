import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import localData from './common/localData';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false;
global.user = null;

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify,

  created: function() {
    localData.getInstance().set('user', null);
    localData.getInstance().set('username', null);
  }
}).$mount('#app');

