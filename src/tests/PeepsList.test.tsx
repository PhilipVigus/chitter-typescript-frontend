import React from "react";
import { render } from "@testing-library/react";
import PeepsList from "../components/PeepsList";

test("renders static text", () => {
  const { getByText } = render(<PeepsList />);
  const linkElement = getByText(/Peeps List/i);
  expect(linkElement).toBeInTheDocument();
});
