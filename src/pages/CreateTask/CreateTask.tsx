import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDepartments,
  useEmployees,
  usePriorities,
  useStatuses,
  useCreateTask,
} from "@/hooks";
import { ROUTES_CONFIG } from "@/config/api-routes";
import { Button } from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { Dropdown } from "@/components/Dropdown";
import { Textarea } from "@/components/Form";
import { ONLY_LATIN_GEORGIAN_REGEX } from "@/constants/regexes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type FormDataState = {
  name: string;
  description: string;
  department_id: number | null;
  employee_id: number | null;
  priority_id: number | null;
  status_id: number | null;
  due_date: Date | null;
};

const initialFormData: FormDataState = {
  name: "",
  description: "",
  department_id: null,
  employee_id: null,
  priority_id: null,
  status_id: null,
  due_date: new Date(),
};

export const CreateTask = ({ onClose }: { onClose?: () => void }) => {
  const navigate = useNavigate();
  const { data: departments } = useDepartments();
  const { data: employees } = useEmployees();
  const { data: statuses } = useStatuses();
  const { data: priorities } = usePriorities();
  const { mutate: createTask } = useCreateTask();

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("taskFormData");

    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  useEffect(() => {
    localStorage.setItem("taskFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    setFormData((prev: FormDataState) => ({
      ...prev,
      employee_id: prev.employee_id && formData.department_id ? null : prev.employee_id,
    }));
  }, [formData.department_id]);

  const updateField = <K extends keyof FormDataState>(
    field: K,
    value: FormDataState[K]
  ) => {
    setFormData((prev: FormDataState) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    localStorage.removeItem("taskFormData");
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createTask(formData, {
      onSuccess: () => {
        resetForm();
        navigate(ROUTES_CONFIG.HOME.path, { replace: true });
        onClose?.();
      },
    });
  };

  return (
    <>
      <h1 className="mt-10 mb-6 text-4xl font-bold">შექმენი ახალი დავალება</h1>
      <div className="h-auto bg-violet-50 px-13 pt-13 pr-90">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-40">
            <div className="flex flex-col gap-14">
              <Input
                required
                showValidationMessage
                label="სათაური"
                className="mt-1.5"
                regex={ONLY_LATIN_GEORGIAN_REGEX}
                value={formData.name}
                onChange={(value) => updateField("name", value)}
              />

              <Textarea
                required
                showValidationMessage
                label="აღწერა"
                value={formData.description}
                onChange={(value) => updateField("description", value)}
              />

              <div className="grid grid-cols-2 gap-6">
                <Dropdown
                  label="პრიორიტეტი"
                  required
                  options={priorities}
                  initialValue={
                    priorities?.find((e) => e.id === formData.priority_id)
                      ?.name || null
                  }
                  onSelect={(value) => updateField("priority_id", value)}
                />
                <Dropdown
                  label="სტატუსი"
                  required
                  options={statuses}
                  initialValue={
                    statuses?.find((e) => e.id === formData.status_id)?.name ||
                    null
                  }
                  onSelect={(value) => updateField("status_id", value)}
                />
              </div>
            </div>
            <div className="gap-26 flex flex-col">
              <Dropdown
                className="mt-1"
                label="დეპარტამენტი"
                required
                options={departments}
                initialValue={
                  departments?.find((e) => e.id === formData.department_id)
                    ?.name || null
                }
                onSelect={(value) => updateField("department_id", value)}
              />
              <Dropdown
                label="თანამშრომელი"
                required
                options={employees}
                initialValue={
                  employees?.find((e) => e.id === formData.employee_id)?.name ||
                  null
                }
                onSelect={(value) => updateField("employee_id", value)}
              />

              <div className="flex flex-col gap-2">
                <label className="zinc-700 font-bold">დედლაინი*</label>
                <div className="relative overflow-visible">
                  <DatePicker
                    selected={formData.due_date}
                    onChange={(date) => updateField("due_date", date)}
                    dateFormat="dd/MM/yyyy"
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-36 mb-54 px-6 py-3 bg-purple-800 rounded-sm text-white cursor-pointer hover:bg-purple-400 transition-colors"
              label="დავალების შექმნა"
            />
          </div>
        </form>
      </div>
    </>
  );
};
