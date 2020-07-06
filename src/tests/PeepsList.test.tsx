import React from "react";
import { render, screen } from "@testing-library/react";
import PeepsList from "../components/PeepsList";

describe("PeepsList", () => {
  it("renders static text", async () => {
    render(<PeepsList peeps={[]} />);

    expect(await screen.findByText(/Peeps List/)).toBeInTheDocument();
  });

  it("renders list of peeps", async () => {
    render(
      <PeepsList
        peeps={[
          { text: "Peep 1", timeCreated: 1594030856065 },
          { text: "Peep 2", timeCreated: 1594030856065 }
        ]}
      />
    );

    expect(await screen.findByText(/Peep 1/)).toBeInTheDocument();
    expect(await screen.findByText(/Peep 2/)).toBeInTheDocument();
  });
});
