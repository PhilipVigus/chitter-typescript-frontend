import React from "react";
import { render, screen } from "@testing-library/react";
import PeepsList from "../components/PeepsList";

describe("PeepsList", () => {
  it("renders static text", async () => {
    render(<PeepsList peeps={[]} />);

    expect(await screen.findByText(/Peeps List/)).toBeInTheDocument();
  });

  it("renders list of peeps", async () => {
    render(<PeepsList peeps={["Peep 1", "Peep 2"]} />);

    expect(await screen.findByText(/Peep 1/)).toBeInTheDocument();
    expect(await screen.findByText(/Peep 2/)).toBeInTheDocument();
  });
});
