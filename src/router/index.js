import Vue from "vue";
import Router from "vue-router";
import BreedList from "../components/BreedList";
import ViewImages from "../components/ViewImages";
import SearchComponent from "../components/SearchComponent";

Vue.use(Router);

const routes = [
  { path: "/list", component: BreedList },
  { path: "/images/:name", component: ViewImages },
  { path: "/search", component: SearchComponent },
  { path: "*", redirect: "/list" }
];

const router = new Router({
  routes,
  mode: "history"
});

export default router;
