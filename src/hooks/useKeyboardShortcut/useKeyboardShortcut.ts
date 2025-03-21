import { useEffect } from "react";
import { KeyboardKeys } from "@/types/front-types/keyboard-keys";

type UseKeyboardShortcutArgs = {
  key: KeyboardKeys;
  onKeyPressed: () => void;
};

export function useKeyboardShortcut({
  key,
  onKeyPressed,
}: UseKeyboardShortcutArgs) {
  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      if (e.key === key) {
        e.preventDefault();

        onKeyPressed();
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [key, onKeyPressed]);
}
