import type { ButtonProps } from "./types";

const Button = ({
  handleClick,
  icon,
  name,
  className,
  type = "button",
  isLoading,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-(--primary-color) hover:bg-(--secondary-color) text-white px-3 py-2 rounded cursor-pointer focus:outline-none ${className}`}
      onClick={handleClick}
      disabled={isLoading || disabled}
    >
      <div
        className={`flex items-center text-xs xl:text-sm text-center justify-center ${
          icon && name ? "gap-2" : ""
        }`}
      >
        {icon} <p>{name}</p>
      </div>
    </button>
  );
};

export default Button;
