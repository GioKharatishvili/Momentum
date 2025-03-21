import { BrowserRouter } from "react-router";
import { Meta } from "@storybook/react";
import { Header } from "@/components";
import { Home } from "./Home";

export default {
  title: "pages/Home/All",
  component: Home,
} as Meta<typeof Home>;

export const All = () => (
  <div className="px-30">
    <BrowserRouter>
      <Header />
    </BrowserRouter>
    <Home />
  </div>
);
