import { ChangeEvent } from "react";
import { Trash, UploadImage } from "@/assets/icons";
import { Button } from "@/components/Button";

type AvatarUploaderProps = {
  value: File | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  error?: string | null;
};

export const AvatarUploader = ({ value, onChange, onRemove, error }: AvatarUploaderProps) => (
  <div className="my-11 flex flex-col gap-2">
    <label className="mb-2 text-sm text-gray-700">ავატარი *</label>
    <div className="relative w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg" tabIndex={0}>
      {value ? (
        <div className="relative w-28 h-28">
          <img
            src={URL.createObjectURL(value)}
            alt="Employee Avatar"
            className="w-full h-full object-cover rounded-full"
          />
          <Button
            className="absolute bottom-0 right-0 bg-white border border-gray-300 p-1 rounded-full shadow-md hover:bg-gray-200"
            onClick={onRemove}
            icon={<Trash />}
          />
        </div>
      ) : (
        <label htmlFor="avatar-upload" className="flex flex-col items-center gap-2 text-gray-600 cursor-pointer">
          <UploadImage />
          <span className="text-sm">ატვირთეთ ფოტო</span>
          <input
            id="avatar-upload"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        </label>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  </div>
);
