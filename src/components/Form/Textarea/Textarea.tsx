import {
  getInputValidationMsg,
  handleInputChange,
  MAX_INPUT_CHAR_LENGTH,
  MIN_TEXTAREA_CHAR_LENGTH,
} from "../lib";

type Props = {
  className?: string;
  label: string;
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  showValidationMessage?: boolean;
  onChange: (value: string) => void;
};

export const Textarea = ({
  className = "",
  label,
  value = "",
  required = false,
  minLength = MIN_TEXTAREA_CHAR_LENGTH,
  maxLength = MAX_INPUT_CHAR_LENGTH,
  placeholder = "",
  showValidationMessage = false,
  onChange,
}: Props) => (
  <div className={`flex flex-col gap-1 relative ${className}`}>
    <label className="zinc-700 font-bold">
      {label}
      {required && <span>*</span>}
    </label>
    <div className="relative">
      <textarea
        rows={4}
        className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
        onChange={(e) => handleInputChange(e, onChange)}
        {...{ required, placeholder, value }}
      />
    </div>

    {showValidationMessage && (
      <div className="bp-2 flex flex-col gap-1">
        {getInputValidationMsg(value, "მინიმუმ", minLength)}
        {getInputValidationMsg(value, "მაქსიმუმ", maxLength)}
      </div>
    )}
  </div>
);
