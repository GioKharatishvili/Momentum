import { TextCrossIcon } from "@/assets/icons";

type Props = {
  label: string;
  onRemove: () => void;
};

export const Tag = ({ label, onRemove }: Props) => {
  return (
    <div className="w-max px-3 py-1 flex items-center gap-2 rounded-full border border-gray-300 bg-white text-zinc-700 text-sm hover:border-gray-200 hover:text-zinc-400">
      {label}

      <button onClick={onRemove} className="focus:outline-none">
        <TextCrossIcon className="w-4 h-4 text-gray-500 hover:text-gray-700 transition cursor-pointer" />
      </button>
    </div>
  );
};
