import { useReducer } from "react";
import { TaskFiltersContext } from "./TaskFiltersContext";
import { TaskFiltersState, TaskFilterType } from "../../lib";

type TaskFiltersAction = {
  type: TaskFilterType;
  payload: number[];
};

const STORAGE_KEY = "taskFilters";

const initialState: TaskFiltersState = {
  [TaskFilterType.Priorities]: [],
  [TaskFilterType.Departments]: [],
  [TaskFilterType.Employees]: [],
};

const reducer = (state: TaskFiltersState, action: TaskFiltersAction) => {
  const newState = { ...state, [action.type]: action.payload };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

  return newState;
};

export const TaskFiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const storedFilters = sessionStorage.getItem(STORAGE_KEY);
  const [state, dispatch] = useReducer(reducer, storedFilters ? JSON.parse(storedFilters) : initialState);

  const setFilter = (type: TaskFilterType, values: number[]) => {
    dispatch({ type, payload: values });
  };

  return (
    <TaskFiltersContext.Provider value={{ state, setFilter }}>
      {children}
    </TaskFiltersContext.Provider>
  );
};
