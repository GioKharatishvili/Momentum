import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";
import { TaskApi } from "@/types/api-types";

export const useTasks = () =>
  useQuery<TaskApi[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
