import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PeepsList from "../components/PeepsList";
import { MainContextProvider } from "../contexts/MainContext";

describe("PeepsList", () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.onGet("http://localhost:5000/peeps").reply(200, {
      peeps: [
        {
          id: 1,
          userId: 1,
          username: "bob",
          text: "Text 1",
          timeCreated: new Date()
        },
        {
          id: 2,
          userId: 1,
          username: "bob",
          text: "Text 2",
          timeCreated: new Date()
        },
        {
          id: 3,
          userId: 1,
          username: "bob",
          text: "Text 3",
          timeCreated: new Date()
        }
      ]
    });
  });

  afterAll(() => {
    mock.restore();
  });
  it("renders static text", async () => {
    render(<PeepsList />);

    expect(await screen.findByText(/Peeps List/)).toBeInTheDocument();
  });

  it("renders list of peeps in reverse chronological order", async () => {
    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router>
          <PeepsList />
        </Router>
      </MainContextProvider>
    );

    const peeps = await screen.findAllByText(/Text/);

    expect(peeps[0].innerHTML).toBe("Text 3");
    expect(peeps[1].innerHTML).toBe("Text 2");
    expect(peeps[2].innerHTML).toBe("Text 1");
  });
});
