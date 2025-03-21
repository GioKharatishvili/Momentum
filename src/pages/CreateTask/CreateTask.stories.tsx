import { BrowserRouter } from "react-router";
import { Meta } from "@storybook/react";
import { Header } from "@/components";
import { CreateTask } from "./CreateTask";

export default {
  title: "pages/Home/CreateTask",
  component: CreateTask,
} as Meta<typeof CreateTask>;

export const All = () => (
  <div className="px-30">
    <BrowserRouter>
      <Header />
    </BrowserRouter>
    <CreateTask onClose={() => {}} />
  </div>
);
