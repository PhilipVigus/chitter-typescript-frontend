import React from "react";
import { render, screen } from "@testing-library/react";
import Peep, { PeepProps } from "../components/Peep";

describe("Peep", () => {
  const data: PeepProps = { text: "Peep text", timeCreated: 1594030856065 };
  it("renders the text", () => {
    render(<Peep text={data.text} timeCreated={data.timeCreated} />);

    expect(screen.getByText(/Peep text/)).toBeInTheDocument();
  });

  it("renders the time created", () => {
    render(<Peep text={data.text} timeCreated={data.timeCreated} />);

    expect(screen.getByText(/11:20:56 on 6-7-2020/)).toBeInTheDocument();
  });
});
