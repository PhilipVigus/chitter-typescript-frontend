import React from "react";
import { render } from "@testing-library/react";
import NewPeepForm from "../components/NewPeepForm";

describe("NewPeepForm", () => {
  it("renders static text", async () => {
    const { findByText } = render(<NewPeepForm />);

    expect(await findByText(/New Peep/)).toBeInTheDocument();
  });
});
