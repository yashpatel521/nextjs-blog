import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "@/app/page";

describe("Header", () => {
  it("renders a heading", () => {
    render(<Blog />);

    const heading = screen.getByRole("heading", {
      name: "Blog",
    });

    expect(heading).toBeInTheDocument();
  });
});
