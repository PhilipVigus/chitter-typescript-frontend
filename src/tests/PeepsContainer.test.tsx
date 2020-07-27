import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PeepsContainer from "../components/PeepsContainer";
import { UserContextProvider } from "../contexts/UserContext";

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
        { id: 1, text: "Peep 1", timeCreated: new Date() },
        { id: 2, text: "Peep 2", timeCreated: new Date() }
      ]
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it("renders static text", async () => {
    render(<PeepsContainer />);

    expect(await screen.findByText(/Peeps List/)).toBeInTheDocument();
  });

  it("renders list of peeps", async () => {
    render(<PeepsContainer />);

    expect(await screen.findByText(/Peep 1/)).toBeInTheDocument();
    expect(await screen.findByText(/Peep 2/)).toBeInTheDocument();
  });

  it("renders a new peep when it has been created", async () => {
    mock
      .onGet("http://localhost:5000/peeps")
      .reply(200, {
        peeps: [
          { id: 1, text: "Peep 1", timeCreated: new Date() },
          { id: 2, text: "Peep 2", timeCreated: new Date() }
        ]
      })
      .onGet("http://localhost:5000/peeps")
      .reply(200, {
        peeps: [
          { id: 1, text: "Peep 1", timeCreated: new Date() },
          { id: 2, text: "Peep 2", timeCreated: new Date() },
          { id: 3, text: "Some text", timeCreated: new Date() }
        ]
      });

    mock.onPost("http://localhost:5000/peeps").reply(200);

    render(<PeepsContainer />);

    const textArea = (await screen.findByRole("textbox")) as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = await screen.findByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Some text/)).toBeInTheDocument();
  });

  it("shows the currently logged in username", async () => {
    render(
      <UserContextProvider initialState={{ name: "phil", id: 3 }}>
        <PeepsContainer />
      </UserContextProvider>
    );
    expect(await screen.findByText(/phil/)).toBeInTheDocument();
  });
});
