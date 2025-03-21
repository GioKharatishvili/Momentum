import { render, fireEvent } from "@testing-library/react";
import { Image } from "./Image";
import { IMAGE_PLACEHOLDER, ImageProps } from "./lib";

const testImg: ImageProps = {
  src: "test.jpg",
  alt: "Test Image",
  width: "200",
  height: "100",
};

const renderComponent = () => render(<Image {...testImg} />);

describe("Image", () => {
  it("renders correctly", () => {
    const { getByRole } = renderComponent();
    const img = getByRole("img");

    Object.entries(testImg).forEach(([key, value]) =>
      expect(img).toHaveAttribute(key, value)
    );
  });

  it("shows placeholder before image loads", () => {
    const { getByTestId } = renderComponent();
    const placeholder = getByTestId(IMAGE_PLACEHOLDER);

    expect(placeholder).toBeInTheDocument();
  });

  it("removes placeholder when image loads", async () => {
    const { getByRole, queryByTestId } = renderComponent();
    const img = getByRole("img");
    fireEvent.load(img);

    expect(queryByTestId(IMAGE_PLACEHOLDER)).not.toBeInTheDocument();
  });

  it("applies opacity transition correctly", async () => {
    const { getByRole } = renderComponent();
    const img = getByRole("img");

    expect(img).toHaveClass("opacity-0");

    fireEvent.load(img);

    expect(img).toHaveClass("opacity-100");
  });
});
