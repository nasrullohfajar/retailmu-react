import type { ButtonActionProps } from "./types";
import { Tooltip } from "react-tooltip";

const ButtonAction = ({
  className,
  icon,
  handleClick,
  tooltipId,
  tooltipContent,
  disabled,
}: ButtonActionProps) => {
  return (
    <>
      <button
        type="button"
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
        className={`${className} w-6 xl:w-8 h-6 xl:h-8 rounded ${
          disabled ? "cursor-not-allowed grayscale-50" : "cursor-pointer"
        }`}
        onClick={handleClick}
        disabled={disabled}
      >
        <div className="text-white flex items-center justify-center">
          {icon}
        </div>
      </button>
      <Tooltip id={tooltipId} place="bottom" className="z-99" />
    </>
  );
};

export default ButtonAction;
