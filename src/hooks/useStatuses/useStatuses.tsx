import { useQuery } from "@tanstack/react-query";
import { fetchStatuses } from "@/api/statuses";
import { IdWithName } from "@/types/shared";

export const useStatuses = () =>
  useQuery<IdWithName[]>({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });
