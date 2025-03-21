import { render } from "@testing-library/react";
import { truncateText } from "@/utils";
import { Department, Priority, TaskStatus } from "@/types/front-types";
import { TaskCard } from "./TaskCard";
import { getDepartmentObj, TaskCardProps } from "../../lib";

const name = "Test Task";

describe("TaskCard", () => {
  const mockProps: TaskCardProps = {
    name,
    description:
      "This is a sample task description that is quite long and should be truncated.",
    priority: Priority.High,
    status: TaskStatus.Todo,
    dueDate: "22 Jan, 2022",
    department: Department["Administration Department"],
    assigneeImage: "https://test.com/50",
  };

  it("renders correctly", () => {
    const { getByText } = render(<TaskCard {...mockProps} />);

    expect(getByText(name)).toBeInTheDocument();
  });

  it("renders the truncated description correctly", () => {
    const { getByText } = render(<TaskCard {...mockProps} />);

    expect(getByText(truncateText(mockProps.description))).toBeInTheDocument();
  });

  it("renders the assignee image correctly", () => {
    const { getByAltText } = render(<TaskCard {...mockProps} />);

    expect(getByAltText("Assignee")).toBeInTheDocument();
  });

  it("renders the Header component with correct props", () => {
    const { getByText } = render(<TaskCard {...mockProps} />);

    const department = getDepartmentObj(mockProps.department);

    expect(getByText(Priority.High)).toBeInTheDocument();
    expect(getByText("22 Jan, 2022")).toBeInTheDocument();
    expect(getByText(department.label)).toBeInTheDocument();
  });
});
