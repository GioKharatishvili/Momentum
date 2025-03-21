import { Meta } from "@storybook/react";
import { Image } from "./Image";
import logo from "@/assets/images/logo.png";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Large = () => (
  <Image src={logo} alt="Large Image" width={500} height={300} />
);

export const Small = () => (
  <Image src={logo} alt="Small Image" width={100} height={30} />
);
