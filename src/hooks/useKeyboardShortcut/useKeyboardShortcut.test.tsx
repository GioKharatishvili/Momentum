import { renderHook, act } from "@testing-library/react";
import { useKeyboardShortcut } from "../useKeyboardShortcut";
import { KeyboardKeys } from "@/types/front-types/keyboard-keys";

const renderUseKeyboardShortcut = (
  key: KeyboardKeys,
  onKeyPressed: jest.Mock
) =>
  renderHook(({ key }) => useKeyboardShortcut({ key, onKeyPressed }), {
    initialProps: { key },
  });

describe("useKeyboardShortcut", () => {
  it("handles key press event", () => {
    const onKeyPressed = jest.fn();
    renderUseKeyboardShortcut(KeyboardKeys.Escape, onKeyPressed);

    act(() => {
      const event = new KeyboardEvent("keydown", { key: KeyboardKeys.Escape });

      document.dispatchEvent(event);
    });

    expect(onKeyPressed).toHaveBeenCalledTimes(1);
  });

  it("does not trigger callback for different key press", () => {
    const onKeyPressed = jest.fn();
    renderUseKeyboardShortcut(KeyboardKeys.Escape, onKeyPressed);

    act(() => {
      const event = new KeyboardEvent("keydown", { key: KeyboardKeys.Enter });
      document.dispatchEvent(event);
    });

    expect(onKeyPressed).not.toHaveBeenCalled();
  });

  it("removes event listener on unmount", () => {
    const onKeyPressed = jest.fn();
    const { unmount } = renderUseKeyboardShortcut(
      KeyboardKeys.Escape,
      onKeyPressed
    );

    unmount();

    act(() => {
      const event = new KeyboardEvent("keydown", { key: KeyboardKeys.Escape });

      document.dispatchEvent(event);
    });

    expect(onKeyPressed).not.toHaveBeenCalled();
  });
});
