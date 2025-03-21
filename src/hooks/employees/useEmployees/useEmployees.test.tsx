import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchEmployees } from "@/api/employees";
import { useEmployees } from "./useEmployees";

jest.mock("@/api/employees", () => ({
  fetchEmployees: jest.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("useEmployees", () => {
  it("returns employees data on success", async () => {
    const mockData = [
      { id: 1, name: "John Doe", position: "Developer" },
      { id: 2, name: "Jane Smith", position: "Designer" },
    ];

    (fetchEmployees as jest.Mock).mockResolvedValue(mockData);

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useEmployees(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.data).toEqual(mockData));
  });

  it("returns an error when API call fails", async () => {
    (fetchEmployees as jest.Mock).mockRejectedValue(new Error("API Error"));

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useEmployees(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.error).toBeDefined());
  });
});
