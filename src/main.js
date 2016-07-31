import Vue from 'vue'
import VueAsyncData from 'vue-async-data'
import VueResource from 'vue-resource'
import VueAnimatedList from 'vue-animated-list'

import App from './App.vue'

import global from './mixins/global.js'

Vue.use(VueAsyncData);
Vue.use(VueResource);
Vue.use(VueAnimatedList);

Vue.mixin(global);

new Vue({
  el: 'body',
  components: { App }
})
