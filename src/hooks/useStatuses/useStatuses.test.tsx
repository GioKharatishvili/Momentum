import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchStatuses } from "@/api/statuses";
import { useStatuses } from "./useStatuses";

jest.mock("@/api/statuses", () => ({
  fetchStatuses: jest.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("useStatuses", () => {
  it("returns statuses data on success", async () => {
    const mockData = [
      { id: 1, name: "Open" },
      { id: 2, name: "Closed" },
    ];

    (fetchStatuses as jest.Mock).mockResolvedValue(mockData);

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useStatuses(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.data).toEqual(mockData));
  });

  it("returns an error when API call fails", async () => {
    (fetchStatuses as jest.Mock).mockRejectedValue(new Error("API Error"));

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useStatuses(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.error).toBeDefined());
  });
});
