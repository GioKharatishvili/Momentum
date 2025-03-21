import { API_BASE_URL } from "@/constants/api";
import { IdWithName } from "@/types/shared";

import { fetchDepartments } from "./departments";

import api from "../axiosInstance";

jest.mock("../axiosInstance");

describe("fetchDepartments", () => {
  it("fetches and returns departments successfully", async () => {
    const mockData: IdWithName[] = [
      { id: 1, name: "Marketing" },
      { id: 2, name: "IT" },
    ];

    (api.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchDepartments();

    expect(api.get).toHaveBeenCalledWith(`${API_BASE_URL}/departments`);
    expect(result).toEqual(mockData);
  });

  it("throws an error when API request fails", async () => {
    const errorText = "API Error";

    (api.get as jest.Mock).mockRejectedValue(new Error(errorText));

    await expect(fetchDepartments()).rejects.toThrow(errorText);
  });
});
