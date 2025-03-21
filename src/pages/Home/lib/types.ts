import { Department, Priority } from "@/types/front-types";

export type ClassNameWithLabel = { className: string; label: string };

export type TaskCardProps = {
  name: string;
  description: string;
  status: string;
  priority: Priority;
  dueDate: string;
  department: Department;
  assigneeImage?: string;
};

export enum TaskFilterType {
  Departments = "departments",
  Priorities = "priorities",
  Employees = "employees",
}

export type TaskFiltersState = Record<TaskFilterType, number[]>;
