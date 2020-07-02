import React from "react";
import { render } from "@testing-library/react";
import PeepsList from "../components/PeepsList";

test("renders static text", () => {
  const { getByText } = render(<PeepsList />);
  expect(getByText(/Peeps List/)).toBeInTheDocument();
});

test("renders list of peeps", () => {
  const { getByText } = render(<PeepsList />);
  expect(getByText(/This is a peep/)).toBeInTheDocument();
  expect(getByText(/This is another peep/)).toBeInTheDocument();
});
