import { render } from "@testing-library/react";
import { useEmployees, useDepartments, usePriorities } from "@/hooks";
import { TaskFilters } from "./TaskFilters";
import { FilterDropdown } from "../FilterDropdown";

const testDropdownId = "filter-dropdown";

jest.mock("@/hooks/usePriorities");
jest.mock("@/hooks/useDepartments");
jest.mock("@/hooks/useEmployees");
jest.mock("../FilterDropdown", () => ({
  FilterDropdown: jest.fn(() => <div data-testid={testDropdownId} />),
}));

describe("TaskFilters", () => {
  const mockPriorities = [{ id: 1, name: "High" }];
  const mockDepartments = [{ id: 2, name: "Marketing" }];
  const mockEmployees = [{ id: 3, name: "Giorgi Kharatishvili" }];

  const setup = () => {
    (usePriorities as jest.Mock).mockReturnValue({ data: mockPriorities });
    (useDepartments as jest.Mock).mockReturnValue({ data: mockDepartments });
    (useEmployees as jest.Mock).mockReturnValue({ data: mockEmployees });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    setup();
    const { getAllByTestId } = render(<TaskFilters />);

    expect(getAllByTestId(testDropdownId)).toHaveLength(3);
  });

  it("renders correct labels for filter dropdowns", () => {
    setup();
    render(<TaskFilters />);

    expect(FilterDropdown).toHaveBeenNthCalledWith(
      1,
      {
        label: "პრიორიტეტები",
        options: [{ id: 1, label: "High", type: "priorities", value: "high" }],
        type: "priorities",
      },
      undefined
    );

    expect(FilterDropdown).toHaveBeenNthCalledWith(
      2,
      {
        label: "დეპარტამენტები",
        options: [
          {
            id: 2,
            label: "Marketing",
            type: "departments",
            value: "marketing",
          },
        ],
        type: "departments",
      },
      undefined
    );

    expect(FilterDropdown).toHaveBeenNthCalledWith(
      3,
      {
        label: "თანამშრომლები",
        options: [
          {
            id: 3,
            label: "Giorgi Kharatishvili",
            type: "employees",
            value: "giorgi kharatishvili",
          },
        ],
        type: "employees",
      },
      undefined
    );
  });
});
