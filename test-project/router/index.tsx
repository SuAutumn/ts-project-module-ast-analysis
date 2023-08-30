import App from "../index";

const Home = React.lazy(() => import("../card"));

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
    ],
  },
];
export default routes;
