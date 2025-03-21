import { useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "@/api/departments";
import { IdWithName } from "@/types/shared";

export const useDepartments = () =>
  useQuery<IdWithName[]>({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });
