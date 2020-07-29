import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PeepsContainer from "../components/PeepsContainer";
import { MainContextProvider } from "../contexts/MainContext";

jest.mock("react-cookies", () => ({
  load: jest.fn().mockImplementation(() => {
    return "phil";
  })
}));

describe("PeepsContainer", () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.onGet("http://localhost:5000/peeps").reply(200, {
      peeps: [
        {
          id: 1,
          userId: 1,
          username: "bob",
          text: "Text 1",
          timeCreated: new Date(),
          comments: [],
          likes: []
        },
        {
          id: 2,
          userId: 1,
          username: "bob",
          text: "Text 2",
          timeCreated: new Date(),
          comments: [],
          likes: []
        },
        {
          id: 3,
          userId: 1,
          username: "bob",
          text: "Text 3",
          timeCreated: new Date(),
          comments: [],
          likes: []
        }
      ]
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it("renders static text", async () => {
    render(
      <Router>
        <PeepsContainer />
      </Router>
    );

    expect(await screen.findByText(/Peeps List/)).toBeInTheDocument();
  });

  it("renders list of peeps", async () => {
    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router>
          <PeepsContainer />
        </Router>
      </MainContextProvider>
    );
    expect(await screen.findByText(/Text 1/)).toBeInTheDocument();
    expect(await screen.findByText(/Text 2/)).toBeInTheDocument();
  });

  it("renders a new peep when it has been created", async () => {
    mock
      .onGet("http://localhost:5000/peeps")
      .reply(200, {
        peeps: [
          {
            id: 1,
            text: "Peep 1",
            timeCreated: new Date(),
            comments: [],
            likes: []
          },
          {
            id: 2,
            text: "Peep 2",
            timeCreated: new Date(),
            comments: [],
            likes: []
          }
        ]
      })
      .onGet("http://localhost:5000/peeps")
      .reply(200, {
        peeps: [
          {
            id: 1,
            text: "Peep 1",
            timeCreated: new Date(),
            comments: [],
            likes: []
          },
          {
            id: 2,
            text: "Peep 2",
            timeCreated: new Date(),
            comments: [],
            likes: []
          },
          {
            id: 3,
            text: "Some text",
            timeCreated: new Date(),
            comments: [],
            likes: []
          }
        ]
      });

    mock.onPost("http://localhost:5000/peeps").reply(200);

    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router>
          <PeepsContainer />
        </Router>
      </MainContextProvider>
    );

    const textArea = (await screen.findByRole("textbox")) as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = await screen.findByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Some text/)).toBeInTheDocument();
  });

  it("shows the currently logged in username", async () => {
    render(
      <MainContextProvider initialState={{ name: "phil", id: 3 }}>
        <Router>
          <PeepsContainer />
        </Router>
      </MainContextProvider>
    );
    expect(await screen.findByText(/phil/)).toBeInTheDocument();
  });
});
