import { render, fireEvent, within } from "@testing-library/react";
import { Tooltip } from "./Tooltip";
import { TooltipPosition } from "./lib";

const BTN_TEXT = "Hover me";
const TOOLTIP_TEXT = "Tooltip text";

const renderComponent = (content: string, position: TooltipPosition) =>
  render(
    <Tooltip {...{ content, position }}>
      <button>{BTN_TEXT}</button>
    </Tooltip>
  );

describe("Tooltip", () => {
  it("renders children correctly", () => {
    const { getByText } = renderComponent(TOOLTIP_TEXT, TooltipPosition.Bottom);

    expect(getByText(BTN_TEXT)).toBeInTheDocument();
  });

  it("shows tooltip on hover", () => {
    const { getByText } = renderComponent(TOOLTIP_TEXT, TooltipPosition.Top);

    const button = getByText(BTN_TEXT);

    fireEvent.mouseEnter(button);

    expect(getByText(TOOLTIP_TEXT)).toBeInTheDocument();
  });

  it("hides tooltip when mouse leaves", () => {
    const { getByText, queryByText } = renderComponent(
      TOOLTIP_TEXT,
      TooltipPosition.Right
    );

    const button = getByText(BTN_TEXT);

    fireEvent.mouseEnter(button);

    expect(getByText(TOOLTIP_TEXT)).toBeInTheDocument();

    fireEvent.mouseLeave(button);

    expect(queryByText(TOOLTIP_TEXT)).not.toBeInTheDocument();
  });

  it("positions tooltip correctly for all positions", () => {
    Object.values(TooltipPosition).forEach((position) => {
      const { container } = renderComponent(`Tooltip ${position}`, position);

      // ავირჩიოთ პირველი მათჩინგ ელემენტი
      const button = within(container).getByText(BTN_TEXT);

      fireEvent.mouseEnter(button);

      const tooltip = within(container).getByText(`Tooltip ${position}`);

      expect(tooltip).toBeInTheDocument();
    });
  });
});
