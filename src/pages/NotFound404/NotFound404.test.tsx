import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFound404 } from "./NotFound404";

describe("NotFound404 component", () => {
  it("renders 404 text and message", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFound404 />
      </MemoryRouter>
    );

    expect(getByText("404")).toBeInTheDocument();
    expect(getByText("Page not found")).toBeInTheDocument();
  });

  it("renders link to home", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFound404 />
      </MemoryRouter>
    );

    const link = getByRole("link", { name: "Go back home" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
