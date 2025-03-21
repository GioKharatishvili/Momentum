import { API_BASE_URL } from "@/constants/api";
import { EmployeeApi } from "@/types/api-types";
import { fetchEmployees } from "./employees";

import api from "../axiosInstance";

jest.mock("../axiosInstance");

describe("fetchEmployees", () => {
  it("fetches and returns employees successfully", async () => {
    const mockData = [
      { id: 1, name: "Giorgi Kharatishvili", department_id: 1 },
      { id: 2, name: "Toma Kharatishvili", department_id: 2 },
    ] as EmployeeApi[];

    (api.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchEmployees();

    expect(api.get).toHaveBeenCalledWith(`${API_BASE_URL}/employees`);
    expect(result).toEqual(mockData);
  });

  it("throws an error when API request fails", async () => {
    const errorText = "API Error";

    (api.get as jest.Mock).mockRejectedValue(new Error(errorText));

    await expect(fetchEmployees()).rejects.toThrow(errorText);
  });
});
