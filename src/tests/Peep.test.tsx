import React from "react";
import { render, screen } from "@testing-library/react";
import Peep from "../components/Peep";

describe("Peep", () => {
  const data = { text: "Peep text" };
  it("renders text", async () => {
    render(<Peep text={data.text} />);

    expect(screen.getByText(/Peep text/)).toBeInTheDocument();
  });
});
