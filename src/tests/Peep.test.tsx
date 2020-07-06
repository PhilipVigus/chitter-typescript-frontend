import React from "react";
import { render, screen } from "@testing-library/react";
import Peep, { PeepProps } from "../components/Peep";

describe("Peep", () => {
  const data: PeepProps = { text: "Peep text" };
  it("renders text", () => {
    render(<Peep text={data.text} />);

    expect(screen.getByText(/Peep text/)).toBeInTheDocument();
  });
});
