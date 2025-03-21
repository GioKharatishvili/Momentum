import { API_BASE_URL } from "@/constants/api";
import { TaskApi } from "@/types/api-types";
import { fetchTasks } from "./tasks";
import api from "../axiosInstance";

jest.mock("../axiosInstance");

describe("fetchTasks", () => {
  it("fetches and returns tasks successfully", async () => {
    const mockData = [
      { id: 1, name: "Task 1", description: "Description 1" },
      { id: 2, name: "Task 2", description: "Description 2" },
    ] as TaskApi[];

    (api.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchTasks();

    expect(api.get).toHaveBeenCalledWith(`${API_BASE_URL}/tasks`);
    expect(result).toEqual(mockData);
  });

  it("throws an error when API request fails", async () => {
    const errorText = "API Error";

    (api.get as jest.Mock).mockRejectedValue(new Error(errorText));

    await expect(fetchTasks()).rejects.toThrow(errorText);
  });
});
