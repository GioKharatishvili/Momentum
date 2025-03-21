import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useClickOutside } from "@/hooks";
import { Button, Tooltip } from "@/components";
import { ArrowDown } from "@/assets/icons";
import {
  CHOOSE_BTN_LABEL,
  TASK_FILTER_LABEL,
  TaskFilterType,
} from "@/pages/Home/lib";
import { useTaskFilters } from "../../hooks/useTaskFilter";
import { Options } from "../FilterDropdown/components/Options";

export type Props = {
  label: (typeof TASK_FILTER_LABEL)[TaskFilterType];
  options: { id: number; label: string }[];
  type: TaskFilterType;
  multiSelect: boolean;
};

export const FilterDropdown = ({
  label,
  options,
  type,
  multiSelect,
}: Props) => {
  const { state, setFilter } = useTaskFilters();
  const specificStateData = state[type] as number[];

  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedOptions, setTempSelectedOptions] = useState<number[]>([]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setTempSelectedOptions(specificStateData);
  }, [specificStateData]);

  useClickOutside({
    refs: [dropdownRef, buttonRef],
    handler: () => setIsOpen(false),
    enabled: isOpen,
  });

  const multiSelectToggle = (id: number) => {
    setTempSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((option) => option !== id) : [...prev, id]
    );
  };

  const singleSelectToggle = (id: number) => {
    setTempSelectedOptions((prev) => (prev.includes(id) ? [] : [id]));
  };

  const applyChanges = () => {
    setFilter(type, tempSelectedOptions);
    setIsOpen(false);
  };

  const hasOptions = options.length > 0;

  const filterBtn = (
    <Button
      className="px-4 py-2 flex items-center justify-between hover:text-purple-400 transition-colors group"
      iconPosition="end"
      disabled={!hasOptions}
      icon={
        <ArrowDown
          className={classNames(
            "ml-2 transition-transform duration-300 ease-in-out",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      }
      onClick={() => setIsOpen(!isOpen)}
      {...{ label }}
    />
  );

  const saveBtn = (
    <div className="flex justify-end">
      <Button
        className="px-13 py-2 text-white rounded-full bg-purple-600 hover:bg-purple-400 transition-colors"
        label={CHOOSE_BTN_LABEL}
        onClick={applyChanges}
      />
    </div>
  );

  return (
    <div className="text-black" ref={dropdownRef}>
      {hasOptions ? (
        filterBtn
      ) : (
        <Tooltip content={`${label}-სთვის დატა არ არსებობს`}>
          {filterBtn}
        </Tooltip>
      )}

      {isOpen && (
        <div
          className={classNames(
            "px-7.5 py-5 w-full max-w-2xl absolute left-30 top-65 bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out origin-top z-10",
            isOpen
              ? "opacity-100 scale-y-100 translate-y-0 visible"
              : "opacity-0 scale-y-95 -translate-y-2.5 invisible"
          )}>
          <Options
            selectedOptions={tempSelectedOptions}
            toggleOption={multiSelect ? multiSelectToggle : singleSelectToggle}
            options={options}
          />
          {saveBtn}
        </div>
      )}
    </div>
  );
};
