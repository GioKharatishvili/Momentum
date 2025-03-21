import { render, fireEvent } from "@testing-library/react";
import {
  CHOOSE_BTN_LABEL,
  FILTER_OPTIONS_LABEL,
  NO_FILTER_OPTIONS_AVAILABLE_LABEL,
  TaskFilterType,
} from "@/pages/Home/lib";
import { FilterDropdown } from "./FilterDropdown";
import { useTaskFilters } from "../../hooks/useTaskFilter";

jest.mock("../../hooks/useTaskFilter", () => ({
  useTaskFilters: jest.fn(),
}));

const mockSetFilter = jest.fn();

const mockUseTaskFilters = (stateOverrides = {}) => {
  (useTaskFilters as jest.Mock).mockReturnValue({
    state: {
      [TaskFilterType.Priorities]: ["მაღალი"],
      [TaskFilterType.Departments]: ["დიზაინი"],
      [TaskFilterType.Employees]: ["გიორგი"],
      ...stateOverrides,
    },
    setFilter: mockSetFilter,
  });
};

const renderComponent = (props = {}) =>
  render(
    <FilterDropdown
      multiSelect
      label="პრიორიტეტი"
      type={TaskFilterType.Priorities}
      options={[
        { label: "მაღალი", value: "high" },
        { label: "საშუალო", value: "medium" },
        { label: "დაბალი", value: "low" },
      ]}
      {...props}
    />
  );

describe("FilterDropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskFilters();
  });

  it("renders correctly", () => {
    const { getByRole } = renderComponent();

    expect(
      getByRole("button", { name: FILTER_OPTIONS_LABEL })
    ).toBeInTheDocument();
  });

  it("opens the dropdown when clicking the button", () => {
    const { getByRole, getByText } = renderComponent();
    const button = getByRole("button", {
      name: FILTER_OPTIONS_LABEL,
    });

    fireEvent.click(button);

    expect(getByText(CHOOSE_BTN_LABEL)).toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside", () => {
    const { getByRole, getByText, queryByText } = renderComponent();
    const button = getByRole("button", {
      name: FILTER_OPTIONS_LABEL,
    });

    fireEvent.click(button);

    expect(getByText(CHOOSE_BTN_LABEL)).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(queryByText(CHOOSE_BTN_LABEL)).not.toBeInTheDocument();
  });

  it("toggles selection of an option", () => {
    const { getByRole, getByLabelText } = renderComponent();

    const button = getByRole("button", {
      name: FILTER_OPTIONS_LABEL,
    });

    fireEvent.click(button);

    const checkbox = getByLabelText("საშუალო") as HTMLInputElement;

    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });

  it("applies selected options when clicking the apply button", () => {
    const { getByRole, getByText, getByLabelText } = renderComponent();
    const button = getByRole("button", {
      name: FILTER_OPTIONS_LABEL,
    });

    fireEvent.click(button);

    fireEvent.click(getByLabelText("დაბალი"));
    fireEvent.click(getByText(CHOOSE_BTN_LABEL));

    expect(mockSetFilter).toHaveBeenCalledWith(
      TaskFilterType.Priorities,
      expect.arrayContaining(["low"])
    );
  });

  it("disables the button if no options are available", () => {
    const { getByRole } = renderComponent({
      options: [],
    });

    const button = getByRole("button", {
      name: NO_FILTER_OPTIONS_AVAILABLE_LABEL,
    });

    expect(button).toBeDisabled();
  });

  it("shows a tooltip when no options are available", () => {
    const { getByRole, getByText } = renderComponent({
      options: [],
    });
    const button = getByRole("button", {
      name: NO_FILTER_OPTIONS_AVAILABLE_LABEL,
    });

    fireEvent.mouseEnter(button);

    expect(getByText("პრიორიტეტი-სთვის დატა არ არსებობს")).toBeInTheDocument();
  });
});
