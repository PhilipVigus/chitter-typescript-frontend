import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import BACKEND_URL from "../config/config";
import PeepsContainer from "../components/PeepsContainer";
import { MainContextProvider } from "../contexts/MainContext";

jest.mock("react-cookies", () => ({
  load: jest.fn().mockImplementation(() => {
    return "phil";
  })
}));

describe("PeepsContainer", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    mock.onGet(`${BACKEND_URL}/peeps`).reply(200, {
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

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
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
      .onGet(`${BACKEND_URL}/peeps`)
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
      .onGet(`${BACKEND_URL}/peeps`)
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

    mock.onPost(`${BACKEND_URL}/peeps`).reply(200);

    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router>
          <PeepsContainer />
        </Router>
      </MainContextProvider>
    );

    const textArea = (await screen.findByRole("textbox")) as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = await screen.findByRole("button", {
      name: "Tell the world"
    });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Some text/)).toBeInTheDocument();
  });
});
