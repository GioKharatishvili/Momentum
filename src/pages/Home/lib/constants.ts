import { TaskFilterType } from "./types";

export const TASKS_PAGE_LABEL = "დავალებების გვერდი";
export const CHOOSE_BTN_LABEL = "არჩევა";
export const CLEAN_UP_BTN_LABEL = "გასუფთავება";
export const TASK_FILTER_LABEL: Record<TaskFilterType, string> = {
  [TaskFilterType.Departments]: "დეპარტამენტები",
  [TaskFilterType.Priorities]: "პრიორიტეტები",
  [TaskFilterType.Employees]: "თანამშრომლები",
};
export const FILTER_OPTIONS_LABEL = "Filter options";
export const NO_FILTER_OPTIONS_AVAILABLE_LABEL = "No filter options available";
export const FILTER_PROVIDER_ERROR_MSG =
  "useTaskFilters must be used within a TaskFiltersProvider";
