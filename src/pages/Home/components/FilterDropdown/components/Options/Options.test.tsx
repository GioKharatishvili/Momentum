import { render, fireEvent } from "@testing-library/react";
import { Options } from "./Options";
import { Priority } from "@/types/front-types";

const mockToggleOption = jest.fn();

const OPTIONS = [
  { label: Priority.High, value: "high" },
  { label: Priority.Medium, value: "medium" },
  { label: Priority.Low, value: "low" },
];

const renderComponent = (selectedOptions: string[] = [], options = OPTIONS) =>
  render(
    <Options
      toggleOption={mockToggleOption}
      {...{ options, selectedOptions }}
    />
  );

describe("Options", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByLabelText } = renderComponent();

    OPTIONS.forEach(({ label }) =>
      expect(getByLabelText(label)).toBeInTheDocument()
    );
  });

  it("checkboxes are checked when selectedOptions contains their value", () => {
    const { getByLabelText } = renderComponent(["high", "medium"]);

    expect(getByLabelText(Priority.High)).toBeChecked();
    expect(getByLabelText(Priority.Medium)).toBeChecked();
    expect(getByLabelText(Priority.Low)).not.toBeChecked();
  });

  it("calls toggleOption when clicking a checkbox", () => {
    const { getByLabelText } = renderComponent();

    fireEvent.click(getByLabelText(Priority.High));

    expect(mockToggleOption).toHaveBeenCalledWith("high");
  });

  it("handles empty options gracefully", () => {
    const { queryByRole } = renderComponent([], []);

    expect(queryByRole("checkbox")).not.toBeInTheDocument();
  });
});
