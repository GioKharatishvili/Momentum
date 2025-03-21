import { useState } from "react";
import classNames from "classnames";
import { tooltipPositionClasses, TooltipPosition } from "./lib";

type Props = {
  className?: string;
  content: string;
  position?: TooltipPosition;
  children: React.ReactNode;
};

export const Tooltip = ({
  className = "",
  content,
  position = TooltipPosition.Bottom,
  children,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}>
      {children}

      {isVisible && (
        <div
          className={classNames(
            "px-3 py-1 absolute whitespace-nowrap text-sm text-white bg-gray-700 rounded-md shadow-md",
            tooltipPositionClasses[position]
          )}>
          {content}
        </div>
      )}
    </div>
  );
};
