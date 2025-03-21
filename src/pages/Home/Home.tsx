import { TaskBoard, TaskFilters, TaskTagList } from "./components";
import { TaskFiltersProvider } from "./context";
import { TASKS_PAGE_LABEL } from "./lib";

export const Home = () => (
  <div>
    <h1 className="mb-13 text-4xl">{TASKS_PAGE_LABEL}</h1>

    <TaskFiltersProvider>
      <TaskFilters />
      <TaskTagList />
      <TaskBoard />
    </TaskFiltersProvider>
  </div>
);
