import { useEffect, RefObject } from "react";

type ClickOutsideOptions = {
  refs: RefObject<HTMLElement | null>[];
  handler: (event: MouseEvent | TouchEvent) => void;
  enabled?: boolean;
};

const isClickInside = (
  refs: RefObject<HTMLElement | null>[],
  event: MouseEvent | TouchEvent
): boolean =>
  (refs ?? []).some((ref) => ref.current?.contains(event.target as Node));

export const useClickOutside = ({
  refs,
  handler,
  enabled = true,
}: ClickOutsideOptions) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      if (isClickInside(refs, event)) {
        console.log("hereeee");

        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler, enabled]);
};
