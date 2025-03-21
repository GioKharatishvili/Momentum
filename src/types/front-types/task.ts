import { TaskApi } from "../api-types";
import { Employee } from "./employee";

export type Task = {
  dueDate: string;
  employee: Employee;
} & Omit<TaskApi, "due_date" | "employee">;
