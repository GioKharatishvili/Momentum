import { useRef, useState } from "react";
import {
  useClickOutside,
  useCreateEmployee,
  useDepartments,
  useKeyboardShortcut,
} from "@/hooks";
import { Close } from "@/assets/icons";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { Input } from "../Form/Input";
import { AvatarUploader } from "./components/AvatarUploader";
import { ONLY_LATIN_GEORGIAN_REGEX } from "@/constants/regexes";
import { MAX_IMG_UPLOAD_SIZE } from "./lib/constants";
import { KeyboardKeys } from "@/types/front-types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type FormDataState = {
  name: string;
  surname: string;
  departmentId: number | null;
  avatar: File | null;
  error: string | null;
};

const initialFormData: FormDataState = {
  name: "",
  surname: "",
  departmentId: null,
  avatar: null,
  error: null,
};

export const AddEmployeeModal = ({ isOpen, onClose }: Props) => {
  const { mutate: createEmployee } = useCreateEmployee();
  const { data: departments } = useDepartments();
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState<FormDataState>(initialFormData);

  const updateField = <K extends keyof FormDataState>(
    field: K,
    value: FormDataState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useKeyboardShortcut({ key: KeyboardKeys.Escape, onKeyPressed: onClose });
  useClickOutside({
    refs: [modalContainerRef],
    handler: () => onClose(),
    enabled: isOpen,
  });

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > MAX_IMG_UPLOAD_SIZE) {
      updateField("error", "მაქს 600KB ზომაში");

      return;
    }
    updateField("avatar", file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, surname, departmentId, avatar } = formData;

    if (!name || !surname || !departmentId) {
      return;
    }

    const payload = new FormData();
    payload.append("name", name);
    payload.append("surname", surname);
    payload.append("department_id", departmentId.toString());

    if (avatar instanceof File) {
      payload.append("avatar", avatar);
    }

    createEmployee(payload, {
      onSuccess: () => {
        resetForm();
        onClose();
      },
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-10">
      <div
        className="px-13 relative rounded-xl shadow-lg bg-white"
        ref={modalContainerRef}>
        <div className="flex justify-end">
          <Button
            className="mt-10"
            tabIndex={0}
            icon={
              <Close className="w-10 h-10 text-gray-200 cursor-pointer hover:text-gray-300" />
            }
            onClick={onClose}
          />
        </div>

        <h2 className="mb-12 text-3xl font-semibold text-center">
          თანამშრომლის დამატება
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-12">
            <Input
              showValidationMessage
              label="სახელი"
              className="w-95"
              regex={ONLY_LATIN_GEORGIAN_REGEX}
              required
              value={formData.name}
              onChange={(value) => updateField("name", value)}
            />
            <Input
              showValidationMessage
              label="გვარი"
              className="w-95"
              regex={ONLY_LATIN_GEORGIAN_REGEX}
              required
              value={formData.surname}
              onChange={(value) => updateField("surname", value)}
            />
          </div>

          <AvatarUploader
            value={formData.avatar}
            error={formData.error}
            onChange={handleAvatarChange}
            onRemove={() => updateField("avatar", null)}
          />

          <Dropdown
            required
            label="დეპარტამენტი"
            className="w-95"
            position="top"
            options={departments?.map(({ id, name }) => ({ id, name }))}
            onSelect={(id: number) => updateField("departmentId", id)}
          />

          <div className="mb-15 flex justify-end gap-5.5">
            <Button
              className="px-5 py-2.5 border border-purple-800 rounded-sm hover:border-purple-400 transition-colors"
              label="გაუქმება"
              onClick={onClose}
            />
            <Button
              className="px-3 py-2 bg-purple-800 rounded-sm text-white hover:bg-purple-400 transition-colors"
              label="დამატება"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
