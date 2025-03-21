import type { Preview } from "@storybook/react";
import { withQueryClient } from "./decorators/withQueryClient";

import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withQueryClient],
};

export default preview;
