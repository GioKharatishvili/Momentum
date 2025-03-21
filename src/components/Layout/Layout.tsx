import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export const Layout = () => (
  <div className="px-30">
    <Header />
    <Outlet />
  </div>
);
