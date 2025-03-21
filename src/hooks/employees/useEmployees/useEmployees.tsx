import { useQuery } from "@tanstack/react-query";

import { fetchEmployees } from "@/api/employees";
import { EmployeeApi } from "@/types/api-types";

export const useEmployees = () =>
  useQuery<EmployeeApi[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
