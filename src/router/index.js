import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home/index"),
  },
];

const router = new VueRouter({
  // mode: "history",
  // base: "./",
  routes,
});

export default router;
