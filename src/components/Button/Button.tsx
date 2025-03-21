import classNames from "classnames";

export type Props = {
  label?: string | null;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  rounded?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className = "",
  label,
  icon,
  rounded = false,
  iconPosition = "start",
  ...props
}: Props) => (
  <button
    className={classNames(
      "flex items-center",
      rounded && "rounded-full",
      className,
      props.disabled ? "disabled:text-gray-400" : "cursor-pointer"
    )}
    {...props}>
    {/* აქ ჯობია children-ად მიიღოს მაგრამ ვეღარ ვასწრებ */}
    {icon && iconPosition === "start" && <span>{icon}</span>}
    {label}
    {icon && iconPosition === "end" && <span>{icon}</span>}
  </button>
);
