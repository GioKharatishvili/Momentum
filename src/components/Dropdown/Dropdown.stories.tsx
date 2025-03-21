import { Meta } from "@storybook/react";
import { Dropdown } from "../Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
};

export default meta;

export const Default = () => <Dropdown label="დეპარტამენტი" />;

export const WithOptions = () => (
  <Dropdown label="დეპარტამენტი" options={["HR", "IT", "Marketing"]} />
);

