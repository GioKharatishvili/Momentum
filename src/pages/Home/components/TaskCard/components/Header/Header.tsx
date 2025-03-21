import classNames from "classnames";

import {
  getPriorityObj,
  getDepartmentObj,
  TaskCardProps,
} from "../../../../lib";

export const Header = ({
  priority,
  dueDate,
  department,
}: Pick<TaskCardProps, "priority" | "dueDate" | "department">) => {
  const taskPriority = getPriorityObj(priority);
  const taskDepartment = getDepartmentObj(department);

  return (
    <div className="flex justify-between items-center">
      <div className="flex center-items justify-center gap-2">
        {taskPriority && (
          <div
            className={classNames(
              "px-2 py-1 flex center-items justify-center text-xs font-medium rounded-md",
              taskPriority.className
            )}>
            {taskPriority.icon}
            {taskPriority.label}
          </div>
        )}

        {taskDepartment && (
          <div
            className={classNames(
              "w-22 flex items-center justify-center text-xs font-light text-white rounded-xl",
              taskDepartment?.className
            )}>
            <p>{taskDepartment?.label}</p>
          </div>
        )}
      </div>

      {dueDate && <span className="text-sm text-gray-400">{dueDate}</span>}
    </div>
  );
};
