import { ArrowDown, ArrowUp, EqualSign } from "@/assets/icons";
import { ClassNameWithLabel, TaskFiltersState, TaskFilterType } from "./types";
import { Department, Priority, TaskStatus } from "@/types/front-types";
import { TaskApi } from "@/types/api-types";

export const getPriorityObj = (
  priority: Priority
): ClassNameWithLabel & { icon: React.ReactNode } => {
  const priorityMap: Record<
    Priority,
    ClassNameWithLabel & { icon: React.ReactNode }
  > = {
    [Priority.High]: {
      className: "bg-white text-red-500 border border-red-500",
      icon: <ArrowUp className="pr-1 text-red-500" />,
      label: Priority.High,
    },
    [Priority.Medium]: {
      className: "bg-white text-amber-400 border border-amber-400",
      icon: <EqualSign className="pr-1 text-amber-400" />,
      label: Priority.Medium,
    },
    [Priority.Low]: {
      className: "bg-white text-green-600 border border-green-600",
      icon: <ArrowDown className="pr-1 text-green-600" />,
      label: Priority.Low,
    },
  };

  return priorityMap[priority];
};

export const getDepartmentObj = (
  department: Department
): ClassNameWithLabel => {
  const departmentMap: Record<Department, ClassNameWithLabel> = {
    [Department["Sales and Marketing Department"]]: {
      className: "bg-pink-400",
      label: "მარკეტინგი",
    },
    [Department["Human Resources Department"]]: {
      className: "bg-orange-400",
      label: "ად. რესურს.",
    },
    [Department["Technology Department"]]: {
      className: "bg-amber-300",
      label: "ინფ. ტექ.",
    },
    [Department["Finance Department"]]: {
      className: "bg-gray-300",
      label: "ფინანსები",
    },
    [Department["Logistics Department"]]: {
      className: "bg-blue-300",
      label: "ლოჯოსტიკა",
    },
    [Department["Media Department"]]: {
      className: "bg-green-700",
      label: "მედია",
    },
    [Department["Administration Department"]]: {
      className: "bg-purple-900",
      label: "ადმინისტრაც.",
    },
  };

  return departmentMap[department];
};

export const getTaskStatusTitleStyles = (name: TaskStatus) => ({
  "bg-yellow-500": name === TaskStatus.Todo,
  "bg-orange-500": name === TaskStatus.InProgress,
  "bg-pink-500": name === TaskStatus.InTesting,
  "bg-blue-500": name === TaskStatus.Done,
});

export const getTaskCardStyles = (name: TaskStatus) => ({
  "border-yellow-500": name === TaskStatus.Todo,
  "border-orange-500": name === TaskStatus.InProgress,
  "border-pink-500": name === TaskStatus.InTesting,
  "border-blue-500": name === TaskStatus.Done,
});

export const transformToFilterOptions = <
  T extends { id: number; name: string }
>(
  data: T[] = [],
  filterType: TaskFilterType
): {
  id: number;
  label: string;
  type: TaskFilterType;
  value: string;
}[] =>
  data.map(({ id, name }) => ({
    id,
    label: name,
    value: name.toLowerCase(),
    type: filterType,
  }));

export const getValidTaskStatus = (status: string): TaskStatus =>
  Object.values(TaskStatus).includes(status as TaskStatus)
    ? (status as TaskStatus)
    : TaskStatus.Todo;

const matchesFilter = (selectedFilters: number[], value: number): boolean =>
  !selectedFilters.length || selectedFilters.includes(value);

export const filterTasks = (
  tasks: TaskApi[],
  state: TaskFiltersState,
  columnId: number
) =>
  tasks?.filter((task) => {
    const matchesStatus = task.status.id === columnId;

    const matchesDepartment = matchesFilter(
      state.departments,
      task.department.id
    );

    const matchesPriority = matchesFilter(state.priorities, task.priority.id);

    const matchesEmployee = matchesFilter(state.employees, task.employee.id);

    return (
      matchesStatus && matchesDepartment && matchesPriority && matchesEmployee
    );
  });
