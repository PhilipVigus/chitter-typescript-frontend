import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Peep from "../components/Peep";

describe("Peep", () => {
  it("renders the text", () => {
    render(
      <Router>
        <Peep />
      </Router>
    );

    expect(screen.getByText(/Individual peep/)).toBeInTheDocument();
  });
});
