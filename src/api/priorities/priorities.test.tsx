import { API_BASE_URL } from "@/constants/api";
import { PriorityApi } from "@/types/api-types";
import { fetchPriorities } from "./priorities";

import api from "../axiosInstance";

jest.mock("../axiosInstance");

describe("fetchPriorities", () => {
  it("fetches and returns priorities successfully", async () => {
    const mockData = [
      { id: 1, name: "High" },
      { id: 2, name: "Medium" },
    ] as PriorityApi[];

    (api.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchPriorities();

    expect(api.get).toHaveBeenCalledWith(`${API_BASE_URL}/priorities`);
    expect(result).toEqual(mockData);
  });

  it("throws an error when API request fails", async () => {
    const errorText = "API Error";

    (api.get as jest.Mock).mockRejectedValue(new Error(errorText));

    await expect(fetchPriorities()).rejects.toThrow(errorText);
  });
});
