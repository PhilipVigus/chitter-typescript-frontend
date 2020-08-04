import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import BACKEND_URL from "../config/config";
import PeepsList from "../components/PeepsList";
import { MainContextProvider } from "../contexts/MainContext";

describe("PeepsList", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    const earliestDate = new Date(2020, 12, 1);
    const middleDate = new Date(2020, 12, 2);
    const latestDate = new Date(2020, 12, 3);

    mock.onGet(`${BACKEND_URL}/peeps`).reply(200, {
      peeps: [
        {
          id: 1,
          userId: 1,
          username: "bob",
          text: "Text 1",
          timeCreated: earliestDate,
          comments: [],
          likes: []
        },
        {
          id: 2,
          userId: 1,
          username: "bob",
          text: "Text 2",
          timeCreated: latestDate,
          comments: [],
          likes: []
        },
        {
          id: 3,
          userId: 1,
          username: "bob",
          text: "Text 3",
          timeCreated: middleDate,
          comments: [],
          likes: []
        }
      ]
    });
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
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

    expect(peeps[0].innerHTML).toBe("Text 2");
    expect(peeps[1].innerHTML).toBe("Text 3");
    expect(peeps[2].innerHTML).toBe("Text 1");
  });

  it("disables the like button if the peep is yours", async () => {
    mock.onGet(`${BACKEND_URL}/peeps`).reply(200, {
      peeps: [
        {
          id: 1,
          userId: 1,
          username: "steve",
          text: "Text 1",
          timeCreated: new Date(),
          comments: [],
          likes: ["bob"]
        }
      ]
    });

    render(
      <MainContextProvider initialState={{ name: "steve", id: 0 }}>
        <Router>
          <PeepsList />
        </Router>
      </MainContextProvider>
    );

    expect(await screen.findByRole("button")).toBeDisabled();
  });
});
