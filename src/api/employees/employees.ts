import { API_BASE_URL } from "@/constants/api";
import { EmployeeApi } from "@/types/api-types";
import api from "../axiosInstance";

export const fetchEmployees = async (): Promise<EmployeeApi[]> => {
  const { data } = await api.get<EmployeeApi[]>(`${API_BASE_URL}/employees`);

  return data;
};

export const createEmployee = async (formData: FormData) => {
  try {
    const { data } = await api.post("/employees", formData, {
      headers: {
        // დოკუმენტაცია შეასწორეთ გთხოვთ, სტრინგის სახით არ იღებს სურათს
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
