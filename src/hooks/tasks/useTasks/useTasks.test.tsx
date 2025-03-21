import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";
import { useTasks } from "./useTasks";

jest.mock("@/api/tasks", () => ({
  fetchTasks: jest.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("useTasks", () => {
  it("returns tasks data on success", async () => {
    const mockData = [
      { id: 1, title: "Task 1", description: "Description 1" },
      { id: 2, title: "Task 2", description: "Description 2" },
    ];

    (fetchTasks as jest.Mock).mockResolvedValue(mockData);

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useTasks(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.data).toEqual(mockData));
    expect(result.current.status).toBeNull();
  });

  fit("returns error message when API call fails", async () => {
    (fetchTasks as jest.Mock).mockRejectedValue(new Error("API Error"));

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useTasks(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.error).toBeDefined());
  });
});
