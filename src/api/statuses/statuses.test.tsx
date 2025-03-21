import { IdWithName } from "@/types/shared";
import { fetchStatuses } from "./statuses";

import api from "../axiosInstance";

jest.mock("../axiosInstance");

describe("fetchStatuses", () => {
  it("fetches and returns statuses successfully", async () => {
    const mockData: IdWithName[] = [
      { id: 1, name: "Open" },
      { id: 2, name: "Closed" },
    ];

    (api.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchStatuses();

    expect(api.get).toHaveBeenCalledWith("/statuses");
    expect(result).toEqual(mockData);
  });

  it("throws an error when API request fails", async () => {
    const errorText = "API Error";

    (api.get as jest.Mock).mockRejectedValue(new Error(errorText));

    await expect(fetchStatuses()).rejects.toThrow(errorText);
  });
});
