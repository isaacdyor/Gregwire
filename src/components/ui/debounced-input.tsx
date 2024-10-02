import { useState, useEffect, useCallback, useRef } from "react";
import { Input, type InputProps } from "./input";
import { Label } from "./label";

interface DebouncedInputProps extends Omit<InputProps, "value" | "onChange"> {
  value: string;
  setValue: (value: string) => void;
  onChange: (value: string) => void;
  label?: string;
  delay?: number;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value,
  setValue,
  onChange,
  label,
  delay = 500,
  ...inputProps
}) => {
  const [localValue, setLocalValue] = useState<string>(value);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasChanged = useRef<boolean>(false);

  const debouncedOnChange = useCallback(
    (value: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        onChange(value);
      }, delay);
    },
    [onChange, delay],
  );

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    setValue(newValue);
    hasChanged.current = true;
    debouncedOnChange(newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      <Input
        {...inputProps}
        value={localValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
      />
    </div>
  );
};
