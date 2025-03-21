import { Meta } from "@storybook/react";
import { Header } from "./Header";
import { BrowserRouter } from "react-router";

export default {
  title: "Components/Header",
  component: Header,
} as Meta;

export const Default = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);
