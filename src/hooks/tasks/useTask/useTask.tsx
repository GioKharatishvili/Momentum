import { useQuery } from "@tanstack/react-query";
import { fetchTaskById } from "@/api/tasks";

export const useTask = (taskId: number) =>
  useQuery({
    queryKey: ["task", taskId],
    queryFn: () => fetchTaskById(taskId),
    enabled: !!taskId,
  });
