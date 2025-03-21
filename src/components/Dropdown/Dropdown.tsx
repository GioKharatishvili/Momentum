import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import { ArrowDown } from "@/assets/icons";
import { Tooltip } from "../Tooltip";
import { Button } from "../Button";
import { CustomOption } from "./CustomOption";
import { useClickOutside } from "@/hooks";

type Props = {
  className?: string;
  label: string;
  required?: boolean;
  options?: { id: number; name: string }[];
  position?: "top" | "bottom";
  initialValue?: string | null;
  onSelect: (id: number) => void;
};

const sharedClasses =
  "w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none";

const icon = (
  <ArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
);

export const Dropdown = ({
  className,
  label,
  required = false,
  options = [],
  position = "bottom",
  initialValue = null,
  onSelect,
}: Props) => {
  const [selected, setSelected] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const optionsContainer = useRef<HTMLUListElement | null>(null);

  useClickOutside({
    refs: [optionsContainer],
    handler: () => setIsOpen(false),
    enabled: isOpen,
  });

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  const handleOptionSelect = (id: number, name: string) => {
    setSelected(name);
    setIsOpen(false);
    onSelect(id);
  };

  return (
    <div className={`relative gap-1 ${className}`}>
      <label className="zinc-700 font-bold">
        {label}
        {required && <span>*</span>}
      </label>
      <div className="relative mt-2">
        {options.length > 0 ? (
          <>
            <Button
              className={classNames("w-full min-h-10", sharedClasses)}
              label={selected}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
              {...{ icon }}
            />

            {isOpen && (
              <ul
                className={classNames(
                  "absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-10",
                  position === "top" && "-top-83"
                )}
                ref={optionsContainer}>
                {options.map(({ id, name }) => (
                  <CustomOption
                    key={id}
                    isSelected={selected === name}
                    onSelect={() => handleOptionSelect(id, name)}
                    option={name}
                  />
                ))}
              </ul>
            )}
          </>
        ) : (
          // ეს რო ითვირთება ცოტა დახტის
          <Tooltip className="w-full" content="არაა ოფშენები">
            <Button
              disabled
              className={classNames(
                sharedClasses,
                "w-full bg-gray-100 cursor-not-allowed"
              )}
              label=""
              {...{ icon }}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};
