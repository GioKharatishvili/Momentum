import { Meta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { NotFound404 } from "./NotFound404";

export default {
  title: "pages/NotFounded404",
  component: NotFound404,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof NotFound404>;

export const All = () => <NotFound404 />;
