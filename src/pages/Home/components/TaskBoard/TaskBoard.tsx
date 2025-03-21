import { Link } from "react-router-dom";
import classNames from "classnames";
import { useTasks, useStatuses } from "@/hooks";
import { filterTasks, getTaskStatusTitleStyles } from "../../lib";
import { TaskCard } from "../TaskCard";
import { Department, Priority, TaskStatus } from "@/types/front-types";
import { useTaskFilters } from "../../hooks/useTaskFilter";

export const TaskBoard = () => {
  const { state } = useTaskFilters();
  const { data: tasks } = useTasks();
  const { data: statuses } = useStatuses();

  return (
    <div className="grid grid-cols-4 gap-13">
      {statuses?.map(({ id, name }) => {
        const filteredTasks = filterTasks(tasks || [], state, id);

        return (
          <div key={id} className="w-full flex flex-col rounded-md">
            <p
              className={classNames(
                "w-full max-w-md mb-7.5 px-5 py-4 text-white text-lg text-center font-medium rounded-md",
                getTaskStatusTitleStyles(name as TaskStatus)
              )}>
              {name}
            </p>
            <Link
              to={`/tasks/${id}`}
              className="max-h-150 flex flex-col gap-7.5 overflow-y-auto no-scrollbar">
              {filteredTasks.map(
                ({
                  id,
                  name,
                  status,
                  description,
                  priority,
                  department,
                  employee,
                  dueDate,
                }) => (
                  <TaskCard
                    key={id}
                    name={name as TaskStatus}
                    status={status.name}
                    priority={priority.name as Priority}
                    department={department.name as Department}
                    assigneeImage={employee.avatar as unknown as string}
                    {...{ description, dueDate }}
                  />
                )
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
