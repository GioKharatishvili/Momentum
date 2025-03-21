import { Close } from "@/assets/icons";
import { Button } from "../../Button";
import { MAX_INPUT_CHAR_LENGTH, MIN_INPUT_CHAR_LENGTH } from "../lib/constants";
import { getInputValidationMsg, handleInputChange } from "../lib";

type Props = {
  className?: string;
  label: string;
  value: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  showValidationMessage?: boolean;
  min?: string | number;
  regex?: RegExp;
  onChange: (value: string) => void;
};

export const Input = ({
  className = "",
  label,
  value = "",
  required = false,
  type = "text",
  minLength = MIN_INPUT_CHAR_LENGTH,
  maxLength = MAX_INPUT_CHAR_LENGTH,
  showValidationMessage,
  placeholder = "",
  min = 0,
  regex,
  onChange,
}: Props) => (
  <div className={`flex flex-col gap-1 relative ${className}`}>
    <label className="zinc-700 font-bold">
      {label}
      {required && <span>*</span>}
    </label>
    <div className="relative">
      <input
        className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        onChange={(e) => handleInputChange(e, onChange, regex)}
        {...{ required, type, min, placeholder, value }}
      />
      {value.length > 1 && (
        <Button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={() => onChange("")}
          icon={<Close className="w-6 h-6 text-black" />}
          tabIndex={-1}
        />
      )}
    </div>

    {showValidationMessage && (<div className="bp-2 flex flex-col gap-1">
      {getInputValidationMsg(value, "მინიმუმ", minLength)}
      {getInputValidationMsg(value, "მაქსიმუმ", maxLength)}
    </div>)}
  </div>
);
