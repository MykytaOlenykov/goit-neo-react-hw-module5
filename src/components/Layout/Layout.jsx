import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Navigation from "../Navigation";
import Loader from "../Loader";
import css from "./Layout.module.css";

const routes = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Movies",
    path: "/movies",
  },
];

export default function Layout() {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <Navigation routes={routes} />
      </header>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
