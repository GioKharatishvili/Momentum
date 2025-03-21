import { useContext } from "react";
import { TaskFiltersContext } from "../../context/TaskFilters";
import { FILTER_PROVIDER_ERROR_MSG } from "../../lib";

export const useTaskFilters = () => {
  const context = useContext(TaskFiltersContext);

  if (!context) {
    throw new Error(FILTER_PROVIDER_ERROR_MSG);
  }

  return context;
};
