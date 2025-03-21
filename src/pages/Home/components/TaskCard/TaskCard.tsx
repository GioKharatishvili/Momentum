import classNames from "classnames";

import { truncateText } from "@/utils";
import { Header } from "./components/Header";
import {
  getTaskCardStyles,
  getValidTaskStatus,
  TaskCardProps,
} from "../../lib";

export const TaskCard = ({
  name,
  description,
  status,
  priority,
  dueDate,
  department,
  assigneeImage,
}: TaskCardProps) => (
  <div
    role="button"
    className={classNames(
      "p-5 flex flex-col w-full max-w-md border rounded-lg shadow-md bg-white cursor-pointer",
      getTaskCardStyles(getValidTaskStatus(status))
    )}
    tabIndex={0}>
    <Header {...{ priority, dueDate, department }} />

    <div className="px-2.5 py-7">
      <p className="font-semibold pb-3">{name}</p>
      <p className="text-gray-700 text-sm font-light">
        {truncateText(description)}
      </p>

      <p>{status}</p>
    </div>

    <div className="flex justify-between items-center">
      <img
        className="w-8 h-8 rounded-full object-cover"
        src={assigneeImage || undefined}
        alt="Assignee"
      />
    </div>
  </div>
);
