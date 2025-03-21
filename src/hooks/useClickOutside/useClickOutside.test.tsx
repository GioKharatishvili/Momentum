import { render, fireEvent } from "@testing-library/react";
import { useRef, useState } from "react";
import { useClickOutside } from "./useClickOutside";

const DROPDOWN_TEXT = "Dropdown Content";
const BTN_TEXT = "Open";

const TestComponent = ({ enabled = true }: { enabled?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useClickOutside({
    refs: [divRef, buttonRef],
    handler: () => setIsOpen(false),
    enabled,
  });

  return (
    <div>
      <button ref={buttonRef} onClick={() => setIsOpen(true)}>
        {BTN_TEXT}
      </button>
      {isOpen && <div ref={divRef}>{DROPDOWN_TEXT}</div>}
    </div>
  );
};

describe("useClickOutside", () => {
  const openDropdown = (getByText: (text: string) => HTMLElement) => {
    fireEvent.click(getByText(BTN_TEXT));
  };

  it("closes when clicking outside", () => {
    const { getByText, queryByText } = render(<TestComponent />);
    openDropdown(getByText);

    expect(getByText(DROPDOWN_TEXT)).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(queryByText(DROPDOWN_TEXT)).not.toBeInTheDocument();
  });

  it("does not close when clicking inside", () => {
    const { getByText } = render(<TestComponent />);
    openDropdown(getByText);

    fireEvent.mouseDown(getByText(DROPDOWN_TEXT));
    expect(getByText(DROPDOWN_TEXT)).toBeInTheDocument();
  });

  it("removes event listeners on unmount", () => {
    const spyRemoveEventListener = jest.spyOn(document, "removeEventListener");

    const { unmount, getByText } = render(<TestComponent />);
    openDropdown(getByText);

    unmount();

    expect(spyRemoveEventListener).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(spyRemoveEventListener).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function)
    );

    spyRemoveEventListener.mockRestore();
  });

  it("does not trigger when disabled", () => {
    const { getByText } = render(<TestComponent enabled={false} />);
    openDropdown(getByText);

    fireEvent.mouseDown(document.body);
    expect(getByText(DROPDOWN_TEXT)).toBeInTheDocument();
  });
});
