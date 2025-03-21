import { API_BASE_URL } from "@/constants/api";
import { TaskApi } from "@/types/api-types";
import api from "../axiosInstance";

export const fetchTasks = async (): Promise<TaskApi[]> => {
  const { data } = await api.get<TaskApi[]>(`${API_BASE_URL}/tasks`);

  return data;
};

export const fetchTaskById = async (taskId: number): Promise<TaskApi> => {
  const { data } = await api.get<TaskApi>(`${API_BASE_URL}/tasks/${taskId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const createTask = async (formData: FormData) => {
  try {
    const { data } = await api.post("/tasks", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (
  taskId: number,
  updatedTask: Partial<TaskApi>
): Promise<TaskApi> => {
  const { data } = await api.put<TaskApi>(
    `${API_BASE_URL}/tasks/${taskId}`,
    updatedTask,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
