import { useState } from "react";
import type { InputTextProps } from "./type";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputText = ({
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
  icon = null,
  secret = false,
  required = false,
  className,
  error,
  disabled,
  formClassname,
  labelClassName,
  readOnly,
  decimal = false,
  errorNoLabel = false,
}: InputTextProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const numberInputOnWheelPreventChange = (
    e: React.WheelEvent<HTMLInputElement>,
  ) => {
    const target = e.target as HTMLInputElement;

    target.blur();
    e.stopPropagation();

    setTimeout(() => {
      target.focus();
    }, 0);
  };

  return (
    <div className={`${className} flex flex-col`}>
      {label && (
        <label htmlFor={name} className="text-xs xl:text-sm capitalize mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div
        className={`flex items-center gap-4 py-3 px-4 rounded border ${
          error ? "border-red-600" : "border-gray-200"
        } ${disabled && "bg-gray-100"} ${formClassname}`}
      >
        {icon && <div className="text-base">{icon}</div>}

        <input
          id={name}
          disabled={disabled}
          name={name}
          type={type ? type : secret && !isOpen ? "password" : "text"}
          placeholder={placeholder}
          value={value === undefined || value === null ? "" : value}
          onChange={onChange}
          autoComplete="on"
          className={`text-xs xl:text-sm focus:outline-none w-full ${labelClassName}`}
          step={decimal ? "0.1" : "1"}
          min={0}
          readOnly={readOnly}
          onWheel={numberInputOnWheelPreventChange}
        />

        {secret && (
          <button
            type="button"
            className="ml-auto cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>

      {error && !errorNoLabel && (
        <p className="text-red-600 text-xs mt-2">{error}</p>
      )}
    </div>
  );
};

export default InputText;
