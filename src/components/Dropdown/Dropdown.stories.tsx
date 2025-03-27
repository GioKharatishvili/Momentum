import { Meta } from "@storybook/react";
import { Dropdown } from "../Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
};

export default meta;

export const Default = () => <Dropdown label="დეპარტამენტი" onSelect={() => {}} />;

export const WithOptions = () => (
  <Dropdown
    label="დეპარტამენტი"
    options={[
      { id: 1, name: "HR" },
      { id: 2, name: "IT" },
      { id: 3, name: "Marketing" },
    ]}
    onSelect={() => {}}
  />
);
