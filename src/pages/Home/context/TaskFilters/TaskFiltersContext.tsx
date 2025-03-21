import { createContext } from "react";
import { TaskFiltersState, TaskFilterType } from "../../lib";

export const TaskFiltersContext = createContext<{
  state: TaskFiltersState;
  setFilter: (type: TaskFilterType, values: number[]) => void;
} | null>(null);
