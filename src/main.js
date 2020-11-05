import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store/store";
import axios from "axios";

Vue.config.productionTip = false;
Vue.config.ignoredElements = ["grid-item", "grid-layout"];
Vue.use(BootstrapVue);

axios.get("https://dog.ceo/api/breeds/list/all").then(response => {
  store.commit("Fetch_Breeds", response.data.message);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
