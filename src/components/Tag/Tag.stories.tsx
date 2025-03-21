import { Meta } from "@storybook/react";
import { Tag } from "./Tag";

export default {
  title: "Components/Tag",
  component: Tag,
} as Meta;

export const Default = () => (
  <Tag label="მაღალი" onRemove={() => console.log("Tag removed")} />
);

export const MultipleTags = () => (
  <div className="flex gap-2">
    <Tag label="დიზაინი" onRemove={() => console.log("Tag removed")} />
    <Tag label="ემილია მორგანი" onRemove={() => console.log("Tag removed")} />
    <Tag label="პროგრესში" onRemove={() => console.log("Tag removed")} />
  </div>
);
