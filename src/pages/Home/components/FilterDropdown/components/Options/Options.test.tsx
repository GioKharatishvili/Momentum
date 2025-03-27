import { render, fireEvent } from "@testing-library/react";
import { Options } from "./Options";
import { Priority } from "@/types/front-types";

const mockToggleOption = jest.fn();

const OPTIONS = [
  { id: 1, label: Priority.High },
  { id: 2, label: Priority.Medium },
  { id: 3, label: Priority.Low },
];

const renderComponent = (selectedOptions: number[] = [], options = OPTIONS) =>
  render(<Options toggleOption={mockToggleOption} {...{ options, selectedOptions }} />);

describe("Options", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByLabelText } = renderComponent();

    OPTIONS.forEach(({ label }) => expect(getByLabelText(label)).toBeInTheDocument());
  });

  it("checkboxes are checked when selectedOptions contains their id", () => {
    const { getByLabelText } = renderComponent([1, 2]);

    expect(getByLabelText(Priority.High)).toBeChecked();
    expect(getByLabelText(Priority.Medium)).toBeChecked();
    expect(getByLabelText(Priority.Low)).not.toBeChecked();
  });

  it("calls toggleOption when clicking a checkbox", () => {
    const { getByLabelText } = renderComponent();

    fireEvent.click(getByLabelText(Priority.High));

    expect(mockToggleOption).toHaveBeenCalledWith(1);
  });

  it("handles empty options gracefully", () => {
    const { queryByRole } = renderComponent([], []);

    expect(queryByRole("checkbox")).not.toBeInTheDocument();
  });
});
