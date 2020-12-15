//將Event Bus注入到main.js裡面

import Vue from 'vue';
Vue.prototype.$bus = new Vue(); //將bus掛載在vue下方

