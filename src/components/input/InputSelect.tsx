import type { InputSelectProps } from "./type";
import { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { customStylesInputSelect } from "../../constants/style/customStyle";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const InputSelect = ({
  name,
  label,
  value,
  options,
  onChange,
  className,
  required,
  error,
  disabled,
  placeholder,
  readOnly,
  errorNoLabel = false,
}: InputSelectProps) => {
  const width = useWindowWidth();

  const mergedOptions = useMemo(() => {
    const defaultOption = { value: "", label: "Pilih opsi" };
    const exists = options.some((opt: any) => opt.value === "");
    return exists ? options : [defaultOption, ...options];
  }, [options]);

  const selectedOption =
    mergedOptions.find((opt: any) => opt.value === value) || mergedOptions[0];

  return (
    <div className="flex flex-col relative">
      {label && (
        <div className="flex gap-2 mb-2 max-h-4 xl:max-h-5">
          <p className="text-xs xl:text-sm">{label}</p>
          {required && <p className="text-red-400">*</p>}
        </div>
      )}

      <Select
        key={width}
        classNamePrefix="react-select"
        options={mergedOptions}
        value={selectedOption}
        onChange={(selected) => {
          const event = {
            target: {
              name,
              value: selected ? selected.value : "",
            },
          } as React.ChangeEvent<HTMLSelectElement>;
          onChange(event);
        }}
        isDisabled={disabled}
        isSearchable
        placeholder={placeholder ?? "Pilih opsi"}
        className={className}
        styles={customStylesInputSelect(!!error)}
        menuIsOpen={readOnly ? false : undefined}
        menuPortalTarget={document.body}
      />

      {error && !errorNoLabel && (
        <p className="text-red-600 text-xs mt-2">{error}</p>
      )}
    </div>
  );
};

export default InputSelect;
