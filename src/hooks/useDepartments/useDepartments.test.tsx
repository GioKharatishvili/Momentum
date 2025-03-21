import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchDepartments } from "@/api/departments";
import { useDepartments } from "./useDepartments";

jest.mock("@/api/departments", () => ({
  fetchDepartments: jest.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("useDepartments", () => {
  it("returns departments data on success", async () => {
    const mockData = [
      { id: 1, name: "Marketing" },
      { id: 2, name: "IT" },
    ];

    (fetchDepartments as jest.Mock).mockResolvedValue(mockData);

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useDepartments(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.data).toEqual(mockData));
  });

  it("returns an error when API call fails", async () => {
    (fetchDepartments as jest.Mock).mockRejectedValue(new Error("API Error"));

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useDepartments(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.error).toBeDefined());
  });
});
