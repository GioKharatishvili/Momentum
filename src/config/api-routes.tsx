import { ReactNode } from "react";
import { Home } from "@/pages/Home";
import { CreateTask } from "@/pages/CreateTask";
import { NotFound404 } from "@/pages/NotFound404";

export type RouteKey = "HOME" | "CREATE_TASK" | "NOT_FOUND";

export const ROUTES_CONFIG: Record<
  RouteKey,
  { path: string; component: ReactNode }
> = {
  HOME: { path: "/", component: <Home /> },
  CREATE_TASK: { path: "/create-task", component: <CreateTask /> },
  NOT_FOUND: { path: "*", component: <NotFound404 /> },
};
