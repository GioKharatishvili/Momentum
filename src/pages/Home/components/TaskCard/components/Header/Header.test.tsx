import { render } from "@testing-library/react";
import { Department, Priority } from "@/types/front-types";
import { Header } from "./Header";

describe("Header", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <Header
        priority={Priority.High}
        dueDate="18 Jan, 2022"
        department={Department["Finance Department"]}
      />
    );

    expect(getByText(Priority.High)).toBeInTheDocument();
  });

  it("renders priority icon correctly", () => {
    const { container } = render(
      <Header
        priority={Priority.High}
        dueDate="22 Jan, 2022"
        department={Department["Finance Department"]}
      />
    );

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders department label correctly", () => {
    const { getByText } = render(
      <Header
        priority={Priority.Medium}
        dueDate="24 Jan, 2022"
        department={Department["Finance Department"]}
      />
    );

    expect(getByText("ფინანსები")).toBeInTheDocument();
  });

  it("renders due date correctly", () => {
    const { getByText } = render(
      <Header
        priority={Priority.Low}
        dueDate="10 Feb, 2023"
        department={Department["Finance Department"]}
      />
    );

    expect(getByText("10 Feb, 2023")).toBeInTheDocument();
  });
});
