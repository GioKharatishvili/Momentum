import { render, fireEvent } from "@testing-library/react";
import { Button, Props } from "./Button";

const label = "Click Me";

const renderComponent = (props?: Partial<Props>) =>
  render(<Button {...{ label }} {...props} />);

describe("Button", () => {
  it("renders correctly", () => {
    const { getByText } = renderComponent();

    const button = getByText(label);

    expect(button).toBeInTheDocument();
    expect(button.className).not.toContain("rounded-full");
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    const { getByRole } = renderComponent({ onClick });

    fireEvent.click(getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies rounded-full class when rounded is true", () => {
    const { getByRole } = renderComponent({ rounded: true });

    const button = getByRole("button");

    expect(button.className).toContain("rounded-full");
  });

  it("does not apply rounded-full class when rounded is false", () => {
    const { getByRole } = renderComponent({ rounded: false });

    const button = getByRole("button");

    expect(button.className).not.toContain("rounded-full");
  });

  it("renders icon when provided", () => {
    const Icon = <span data-testid="icon">👍</span>;
    const { getByTestId } = renderComponent({ icon: Icon });

    expect(getByTestId("icon")).toBeInTheDocument();
  });

  it("applies additional props props", () => {
    const { getByRole } = renderComponent({ tabIndex: 0 });

    const button = getByRole("button");

    expect(button).toHaveAttribute("tabindex", "0");
  });

  it("applies disabled attribute if button is disabled", () => {
    const { getByRole } = renderComponent({ disabled: true });

    const button = getByRole("button");

    expect(button).toBeDisabled();

    expect(button.className).toContain("disabled:text-gray-400");
  });
});
