import { API_BASE_URL } from "@/constants/api";
import { PriorityApi } from "@/types/api-types";
import api from "../axiosInstance";

export const fetchPriorities = async (): Promise<PriorityApi[]> => {
  const { data } = await api.get<PriorityApi[]>(`${API_BASE_URL}/priorities`);

  return data;
};
