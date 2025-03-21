import { Check } from "@/assets/icons";

export const getInputValidationMsg = (
  value: string,
  msg: string,
  charLength: number
) => (
  <div className="flex items-center gap-2 text-gray-700">
    <Check
      className={`w-5 h-5 ${
        value.length >= charLength ? "text-green-500" : "text-gray-400"
      }`}
    />
    <span>
      {msg} {charLength} სიმბოლო
    </span>
  </div>
);

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  onChange: (value: string) => void,
  regex?: RegExp
) => {
  const newValue = e.target.value;

  if (!regex || regex.test(newValue)) {
    onChange(newValue);
  }
};
