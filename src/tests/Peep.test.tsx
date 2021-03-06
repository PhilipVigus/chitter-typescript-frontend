import React from "react";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import BACKEND_URL from "../config/config";
import Peep from "../components/Peep";
import { MainContextProvider } from "../contexts/MainContext";

describe("Peep", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    const peepCreationDate = new Date(2020, 5, 3, 11, 5, 23);
    const commentCreationDate = new Date(2020, 6, 3, 11, 5, 23);

    mock.onGet(`${BACKEND_URL}/peeps`).reply(200, {
      peeps: [
        {
          id: 1,
          username: "steve",
          text: "Peep 1",
          timeCreated: peepCreationDate,
          comments: [
            {
              id: 1,
              userId: 3,
              peepId: 4,
              username: "bob",
              text: "A comment",
              timeCreated: commentCreationDate
            }
          ],
          likes: ["bob"]
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

  it("renders the peep details", async () => {
    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router initialEntries={["/peeps/1"]}>
          <Route path="/peeps/:id">
            <Peep />
          </Route>
        </Router>
      </MainContextProvider>
    );

    expect(await screen.findByText(/steve/)).toBeInTheDocument();
    expect(await screen.findByText(/Peep 1/)).toBeInTheDocument();
    expect(await screen.findByText(/11:5:23 on 3-6-2020/)).toBeInTheDocument();
  });

  it("renders the peep comments", async () => {
    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router initialEntries={["/peeps/1"]}>
          <Route path="/peeps/:id">
            <Peep />
          </Route>
        </Router>
      </MainContextProvider>
    );

    expect(await screen.findByText(/A comment/)).toBeInTheDocument();
    expect(await screen.findByText(/steve/)).toBeInTheDocument();
    expect(await screen.findByText(/11:5:23 on 3-7-2020/)).toBeInTheDocument();
  });

  it("renders the likes widget", async () => {
    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router initialEntries={["/peeps/1"]}>
          <Route path="/peeps/:id">
            <Peep />
          </Route>
        </Router>
      </MainContextProvider>
    );

    expect(await screen.findByRole("button")).toBeInTheDocument();
    expect(await screen.findByText("1")).toBeInTheDocument();
  });
});
