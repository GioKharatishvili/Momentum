import { Header } from "./Header";
import { renderWithRouter } from "@/tests/helpers";
import { CREATE_NEW_EMPLOYEE, CREATE_NEW_TASK } from "./lib";

const renderComponent = () => renderWithRouter(<Header />);

describe("Header", () => {
  it("renders correctly", () => {
    const { getByRole } = renderComponent();
    const logo = getByRole("img", { name: /logo/i });

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("alt", "Logo");
  });

  it("renders navigation link to home", () => {
    const { getByRole } = renderComponent();
    const homeLink = getByRole("link");

    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders create employee button with correct labels", () => {
    const { getByText } = renderComponent();
    const createEmployeeButton = getByText(CREATE_NEW_EMPLOYEE);

    expect(createEmployeeButton).toBeInTheDocument();
  });

  it("renders create task button with correct labels", () => {
    const { getByText } = renderComponent();
    const createTaskButton = getByText(CREATE_NEW_TASK);

    expect(createTaskButton).toBeInTheDocument();
  });
});
