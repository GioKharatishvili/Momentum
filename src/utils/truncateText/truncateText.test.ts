import { describe, it, expect } from "@jest/globals";
import { truncateText } from "./truncateText";

describe("truncateText", () => {
  it("returns the original text if it is within the limit", () => {
    expect(truncateText("Short text", 20)).toBe("Short text");
  });

  it("truncates text longer than maxLength and appends ellipsis", () => {
    expect(truncateText("This is a long text that needs truncation", 10)).toBe(
      "This is a..."
    );
  });

  it("handles empty strings correctly", () => {
    expect(truncateText("", 10)).toBe("");
  });

  it("returns text as is when maxLength is 0", () => {
    expect(truncateText("Momentum", 0)).toBe("Momentum");
  });
});
