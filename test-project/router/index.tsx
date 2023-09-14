import React, { lazy } from "react";
import App from "../index";
import my from "./my-router/my";

const Home = React.lazy(() => import("../card"));
const A = lazy(() => import("../card"));

const routes = [
  {
    path: "/",
    componentId: "Index",
    component: App,
  },
  {
    path: "/home",
    componentId: "Home",
    component: Home,
    routes: [
      {
        path: "/home/component",
        componentId: "component",
        component: () => <div>Component</div>,
      },
      {
        path: "/home/A",
        component: A,
      },
      ...my,
    ],
  },
];
export default routes;
