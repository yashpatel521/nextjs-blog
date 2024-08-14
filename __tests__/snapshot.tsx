/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import Blog from "@/app/page";

it("renders homepage unchanged", () => {
  const { container } = render(<Blog />);
  expect(container).toMatchSnapshot();
});
