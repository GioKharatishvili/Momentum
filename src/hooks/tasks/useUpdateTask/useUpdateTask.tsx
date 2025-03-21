import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/tasks";
import { TaskApi } from "@/types/api-types";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      updatedTask,
    }: {
      taskId: number;
      updatedTask: Partial<TaskApi>;
    }) => updateTask(taskId, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
