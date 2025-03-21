import { EmployeeApi } from "../api-types";

export type Employee = {
  departmentId: number;
} & Omit<EmployeeApi, "department_id">;

export type EmployeeForm = Omit<EmployeeApi, "id" | "avatar"> & {
  avatar: File | null;
};
