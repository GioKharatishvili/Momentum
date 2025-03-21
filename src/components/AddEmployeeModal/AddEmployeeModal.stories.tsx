import { Meta } from "@storybook/react";
import { useState } from "react";
import { AddEmployeeModal } from "./AddEmployeeModal";

const meta: Meta<typeof AddEmployeeModal> = {
  title: "Components/AddEmployeeModal",
  component: AddEmployeeModal,
};

export default meta;

export const Default = () => (
  <AddEmployeeModal isOpen={true} onClose={() => {}} />
);

export const WithState = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AddEmployeeModal
      options={["HR", "IT", "Marketing"]}
      onClose={() => setIsOpen(false)}
      {...{ isOpen }}
    />
  );
};
