import Vue from "vue";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import router from './router'
import mountApps from "./micro";
import actions from "@/shared/actions";
import "./assets/styles/locale.antd.css";
import { CollapsePanel } from "ant-design-vue/types/collapse/collapse-panel";
// import permission from './permission.js'
import permission from 'micro-app-common/src/utils/permission'
import store from './store'
import { commonStore as registCommonStore } from 'micro-app-common'


Vue.use(Antd);
Vue.config.productionTip = false;

registCommonStore(store)
Vue.use(permission, {router, store})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#main-app");

mountApps({
  // sandbox: {
  //   strictStyleIsolation: true,
  // },
});

