import { IdWithName } from "@/types/shared";
import { PriorityApi } from "./priority-api";
import { EmployeeApi } from "./employee-api";

export type TaskApi = {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: IdWithName;
  priority: PriorityApi;
  department: IdWithName;
  employee: EmployeeApi;
};
