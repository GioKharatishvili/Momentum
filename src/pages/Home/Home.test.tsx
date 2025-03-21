import { render } from "@testing-library/react";
import { Home } from "./Home";
import { TASKS_PAGE_LABEL } from "./lib";

const TASK_FILTERS = "TASK_FILTERS";
const TASK_TAG_LIST = "TASK_TAG_LIST";
const TASK_BOARD = "TASK_BOARD";

jest.mock("./components", () => ({
  TaskBoard: () => <div data-testid={TASK_BOARD} />,
  TaskFilters: () => <div data-testid={TASK_FILTERS} />,
  TaskTagList: () => <div data-testid={TASK_TAG_LIST} />,
}));

describe("Home", () => {
  it("renders page title", () => {
    const { getByRole } = render(<Home />);

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      TASKS_PAGE_LABEL
    );
  });

  it("renders children correctly", () => {
    const { getByTestId } = render(<Home />);

    [TASK_FILTERS, TASK_TAG_LIST, TASK_BOARD].forEach((testId) => {
      expect(getByTestId(testId)).toBeInTheDocument();
    });
  });
});
