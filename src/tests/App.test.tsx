import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders Chitter static text", () => {
  const { getByText } = render(<App />);
  const text = getByText(/Chitter/i);
  expect(text).toBeInTheDocument();
});
