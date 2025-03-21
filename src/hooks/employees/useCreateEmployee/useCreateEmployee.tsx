import { createEmployee } from "@/api/employees";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => {
      alert("თანამშრომელმა არ დავემატებიო.");
    },
  });
};
