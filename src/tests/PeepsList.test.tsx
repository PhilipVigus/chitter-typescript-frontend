import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PeepsList from "../components/PeepsList";

describe("PeepsList", () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock
      .onGet("https://localhost:5000/peeps")
      .reply(200, { peeps: ["Peep 1", "Peep 2"] });
  });

  afterAll(() => {
    mock.restore();
  });

  it("renders static text", async () => {
    render(<PeepsList />);

    expect(await screen.findByText(/Peeps List/)).toBeInTheDocument();
  });

  it("renders list of peeps", async () => {
    render(<PeepsList />);

    expect(await screen.findByText(/Peep 1/)).toBeInTheDocument();
    expect(await screen.findByText(/Peep 2/)).toBeInTheDocument();
  });
});
