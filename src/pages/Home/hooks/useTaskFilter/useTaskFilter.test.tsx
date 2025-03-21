import { renderHook } from "@testing-library/react";
import { useTaskFilters } from "./useTaskFilters";
import { TaskFiltersContext } from "../../context/TaskFilters";
import { FILTER_PROVIDER_ERROR_MSG, TaskFilterType } from "../../lib";

describe("useTaskFilters", () => {
  it("returns context when used inside TaskFiltersProvider", () => {
    const mockContextValue = {
      state: {
        priorities: [],
        departments: [],
        employees: [],
      },
      setFilter: jest.fn() as jest.Mock<
        (type: TaskFilterType, values: string[]) => void
      >,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TaskFiltersContext.Provider value={mockContextValue}>
        {children}
      </TaskFiltersContext.Provider>
    );

    const { result } = renderHook(() => useTaskFilters(), { wrapper });

    expect(result.current).toEqual(mockContextValue);
  });

  it("throws an error when used outside TaskFiltersProvider", () => {
    expect(() => renderHook(() => useTaskFilters())).toThrow(
      FILTER_PROVIDER_ERROR_MSG
    );
  });
});
