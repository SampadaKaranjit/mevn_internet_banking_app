import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/LoginUser.vue"),
  },

  {
    path: "/transfers",
    name: "Transfer",
    component: () => import("../views/Transfer.vue"),
  },

  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("../views/Analytics.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
