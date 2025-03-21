import classNames from "classnames";

type Props = {
  option: string;
  isSelected: boolean;
  onSelect: () => void;
};

// ოფშენი არ ისტილება პირდაპირ
export const CustomOption = ({ option, isSelected, onSelect }: Props) => (
  <li
    className={classNames(
      "px-4 py-2 font-light text-gray-800 hover:bg-indigo-100 cursor-pointer",
      isSelected && "text-indigo-700 font-semibold"
    )}
    onClick={() => onSelect()}>
    {option}
  </li>
);
