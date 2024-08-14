import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "@/app/page";

describe("Header", () => {
  it("renders a heading", async () => {
    const Component = await Blog();
    const screen = await render(Component);
    // debug();
    const heading = screen.getByRole("heading", {
      name: "Blog",
    });

    expect(heading).toBeInTheDocument();
  });
});
