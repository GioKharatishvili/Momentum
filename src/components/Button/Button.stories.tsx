import { Meta } from "@storybook/react";
import { Button } from "./Button";
import { PlusIcon } from "@/assets/icons";

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

export const Default = () => (
  <Button
    label="Default Button"
    className="px-5 py-2.5 border border-gray-800"
  />
);

export const Rounded = () => (
  <Button
    label="Rounded Button"
    rounded
    className="px-5 py-2.5 border border-gray-800"
  />
);

export const WithIconStart = () => (
  <Button
    label="With Icon"
    className="px-5 py-2.5 bg-blue-600 text-white"
    icon={<PlusIcon />}
  />
);

export const WithIconEnd = () => (
  <Button
    label="With Icon"
    className="px-5 py-2.5 bg-blue-600 text-white"
    icon={<PlusIcon />}
    iconPosition="end"
  />
);

export const Disabled = () => (
  <Button
    label="Disabled"
    disabled
    className="px-5 py-2.5 border border-gray-400 text-gray-400 bg-white"
  />
);

export const CustomStyled = () => (
  <Button
    label="Custom Styled"
    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg"
  />
);
