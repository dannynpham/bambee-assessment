import Vue from 'vue';
import * as pollens from '@bambee/pollen';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Object.entries(pollens).forEach(([name, component]) => {
  if (name !== 'constants') {
    Vue.component(name, component);
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
