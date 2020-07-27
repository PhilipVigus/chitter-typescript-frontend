import React from "react";
import { render, screen } from "@testing-library/react";
import Peep from "../components/Peep";

describe("Peep", () => {
  it("renders the text", () => {
    render(<Peep />);

    expect(screen.getByText(/Individual peep/)).toBeInTheDocument();
  });
});
