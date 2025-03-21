import { Meta } from "@storybook/react";
import { Priority, Department, TaskStatus } from "@/types/front-types";
import { TaskCard } from "./TaskCard";
import employee from "@/assets/images/employee.jpeg";

export default {
  title: "pages/Home/TaskCard",
  component: TaskCard,
} as Meta;

export const ShortDescription = () => (
  <TaskCard
    name="Redberry-ს საიტის ლენდინგის დიზაინი"
    description="შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას."
    status={TaskStatus.Todo}
    priority={Priority.High}
    dueDate="22 Jan, 2022"
    department={Department["Administration Department"]}
    assigneeImage={employee}
  />
);

export const LongDescription = () => (
  <TaskCard
    name="Redberry-ს საიტის ლენდინგის დიზაინი"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    status={TaskStatus.Todo}
    priority={Priority.Medium}
    dueDate="10 Feb, 2022"
    department={Department["Administration Department"]}
    assigneeImage={employee}
  />
);

export const HighPriority = () => (
  <TaskCard
    name="Redberry-ს საიტის ლენდინგის დიზაინი"
    description="შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას."
    status={TaskStatus.Todo}
    priority={Priority.High}
    dueDate="22 Jan, 2022"
    department={Department["Administration Department"]}
    assigneeImage={employee}
  />
);

export const MediumPriority = () => (
  <TaskCard
    name="Redberry-ს საიტის ლენდინგის დიზაინი"
    description="შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას."
    status={TaskStatus.Todo}
    priority={Priority.Medium}
    dueDate="22 Jan, 2022"
    department={Department["Administration Department"]}
    assigneeImage={employee}
  />
);

export const LowPriority = () => (
  <TaskCard
    name="Redberry-ს საიტის ლენდინგის დიზაინი"
    description="შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას."
    status={TaskStatus.Todo}
    priority={Priority.Low}
    dueDate="22 Jan, 2022"
    department={Department["Administration Department"]}
    assigneeImage={employee}
  />
);
