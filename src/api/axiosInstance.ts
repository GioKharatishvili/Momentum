import { API_BASE_URL } from "@/constants/api";
import axios from "axios";

//ინტერცეფტორი რომ გავაყოლოთთ ტოკენი საჭიროებს
export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = "9e70f7a7-3990-4f94-9276-05543714a965";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
