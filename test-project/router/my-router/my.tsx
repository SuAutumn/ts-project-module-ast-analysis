import { lazy } from "react";

const A = lazy(() => import("../card"));
const withHoc = () => {
  return (hoc: any) => hoc;
};
export default [
  {
    path: "/my",
    component: A,
    componentId: "my",
    exact: true,
  },
  {
    path: "/profile",
    component: withHoc()(A),
  },
];
