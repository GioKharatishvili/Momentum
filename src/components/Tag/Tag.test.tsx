import { render, fireEvent } from "@testing-library/react";
import { Priority } from "@/types/front-types";
import { Tag } from "./Tag";

const mockOnRemove = jest.fn();
const label = Priority.High;

const renderComponent = () =>
  render(<Tag onRemove={mockOnRemove} {...{ label }} />);

describe("Tag", () => {
  it("renders correctly", () => {
    const { getByText } = renderComponent();

    expect(getByText(label)).toBeInTheDocument();
  });

  it("calls onRemove when close button is clicked", () => {
    const { getByRole } = renderComponent();

    const closeButton = getByRole("button");
    fireEvent.click(closeButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it("renders the close icon", () => {
    const { container } = renderComponent();

    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
