import { useDepartments, usePriorities, useEmployees } from "@/hooks";
import { TASK_FILTER_LABEL, TaskFilterType, transformToFilterOptions } from "../../lib";
import { FilterDropdown } from "../FilterDropdown";

export const TaskFilters = () => {
  const { data: priorities } = usePriorities();
  const { data: departments } = useDepartments();
  const { data: employees } = useEmployees();

  const prioritiesOptions = transformToFilterOptions(priorities, TaskFilterType.Priorities);
  const departmentsOptions = transformToFilterOptions(departments, TaskFilterType.Departments);
  const employeesOptions = transformToFilterOptions(employees, TaskFilterType.Employees);

  const filterGroups = [
    {
      label: TASK_FILTER_LABEL.departments,
      type: TaskFilterType.Departments,
      options: departmentsOptions,
      multiSelect: true,
    },
    {
      label: TASK_FILTER_LABEL.priorities,
      type: TaskFilterType.Priorities,
      options: prioritiesOptions,
      multiSelect: true,
    },

    {
      label: TASK_FILTER_LABEL.employees,
      type: TaskFilterType.Employees,
      options: employeesOptions,
      multiSelect: false,
    },
  ];

  return (
    <div className="w-max flex gap-4 border border-gray-300 rounded-md">
      {filterGroups.map(({ label, type, options, multiSelect }) => (
        <FilterDropdown
          key={type}
          {...{
            label,
            options,
            multiSelect,
            type,
          }}
        />
      ))}
    </div>
  );
};
