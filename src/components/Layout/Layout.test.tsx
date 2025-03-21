import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "./Layout";

const testDataId = "header"

jest.mock("../Header", () => ({
  Header: () => <div data-testid={testDataId} />,
}));

describe("Layout", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(getByTestId(testDataId)).toBeInTheDocument();
  });
});
