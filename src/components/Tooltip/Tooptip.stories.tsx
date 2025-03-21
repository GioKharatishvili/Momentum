import { Meta } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { TooltipPosition } from "./lib";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
} as Meta;

export const Default = () => (
  <Tooltip content="Default Tooltip on bottom">
    <button className="px-4 py-2 border rounded-md">Default Bottom</button>
  </Tooltip>
);

export const Top = () => (
  <Tooltip content="Tooltip on top" position={TooltipPosition.Top}>
    <button className="px-4 py-2 border rounded-md">Top</button>
  </Tooltip>
);

export const Left = () => (
  <Tooltip content="Tooltip on left" position={TooltipPosition.Left}>
    <button className="px-4 py-2 border rounded-md">Left</button>
  </Tooltip>
);

export const Right = () => (
  <Tooltip content="Tooltip on right" position={TooltipPosition.Right}>
    <button className="px-4 py-2 border rounded-md">Right</button>
  </Tooltip>
);
