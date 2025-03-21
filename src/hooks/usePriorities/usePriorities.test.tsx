import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchPriorities } from "@/api/priorities";
import { usePriorities } from "./usePriorities";

jest.mock("@/api/priorities", () => ({
  fetchPriorities: jest.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("usePriorities", () => {
  it("returns priorities data on success", async () => {
    const mockData = [
      { id: 1, label: "High", value: "high" },
      { id: 2, label: "Medium", value: "medium" },
    ];

    (fetchPriorities as jest.Mock).mockResolvedValue(mockData);

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => usePriorities(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.data).toEqual(mockData));
  });

  it("returns an error when API call fails", async () => {
    (fetchPriorities as jest.Mock).mockRejectedValue(new Error("API Error"));

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => usePriorities(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.error).toBeDefined());
  });
});
