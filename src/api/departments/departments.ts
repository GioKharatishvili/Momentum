import { API_BASE_URL } from "@/constants/api";
import { IdWithName } from "@/types/shared";
import api from "../axiosInstance";

export const fetchDepartments = async (): Promise<IdWithName[]> => {
  const { data } = await api.get<IdWithName[]>(`${API_BASE_URL}/departments`);

  return data;
};
