import { Tick } from "@/assets/icons";

export type Props = {
  options: { id: number; label: string }[];
  selectedOptions: number[];
  toggleOption: (id: number) => void;
};

export const Options = ({ options, selectedOptions, toggleOption }: Props) => (
  <div className="py-5">
    {options.map(({ id, label }) => (
      <label
        key={id}
        className="px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
        <input
          type="checkbox"
          className="peer hidden"
          checked={selectedOptions.includes(id)}
          onChange={() => toggleOption(id)}
        />

        <div className="h-6 w-6 flex items-center justify-center border-2 border-gray-700 rounded-md">
          {selectedOptions.includes(id) && <Tick className="w-4 h-4 text-gray-700" />}
        </div>

        {label}
      </label>
    ))}
  </div>
);
