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
          { _id: 1, _text: "Peep 1", _timeCreated: new Date() },
          { _id: 2, _text: "Peep 2", _timeCreated: new Date() }
        ]}
      />
    );

    expect(await screen.findByText(/Peep 1/)).toBeInTheDocument();
    expect(await screen.findByText(/Peep 2/)).toBeInTheDocument();
  });

  it("renders list of peeps in reverse chronological order", async () => {
    render(
      <PeepsList
        peeps={[
          { _id: 1, _text: "Text 1", _timeCreated: new Date() },
          { _id: 2, _text: "Text 2", _timeCreated: new Date() },
          { _id: 3, _text: "Text 3", _timeCreated: new Date() }
        ]}
      />
    );

    const peeps = await screen.findAllByText(/Text/);

    expect(peeps[0].innerHTML).toBe("Text 3");
    expect(peeps[1].innerHTML).toBe("Text 2");
    expect(peeps[2].innerHTML).toBe("Text 1");
  });
});
