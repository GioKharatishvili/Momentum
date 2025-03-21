import { useQuery } from "@tanstack/react-query";
import { fetchPriorities } from "@/api/priorities";
import { PriorityApi } from "@/types/api-types";

export const usePriorities = () =>
  useQuery<PriorityApi[]>({
    queryKey: ["priorities"],
    queryFn: fetchPriorities,
  });
