import type { InputTextProps } from "./type";

const InputTextArea = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  icon = null,
  required = false,
  className,
  error,
  disabled,
  formClassname,
  labelClassName,
  readOnly,
  errorNoLabel = false,
}: InputTextProps) => {
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

        <textarea
          id={name}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          className={`text-xs xl:text-sm focus:outline-none w-full ${labelClassName}`}
          readOnly={readOnly}
          value={value === undefined || value === null ? "" : value}
          onChange={onChange}
          rows={5}
        />
      </div>

      {error && !errorNoLabel && (
        <p className="text-red-600 text-xs mt-2">{error}</p>
      )}
    </div>
  );
};

export default InputTextArea;
