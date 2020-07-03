import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PeepsContainer from "../components/PeepsContainer";

describe("PeepsContainer", () => {
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
      .onGet("https://localhost:5000/peeps")
      .reply(200, { peeps: ["Peep 1", "Peep 2"] })
      .onGet("https://localhost:5000/peeps")
      .reply(200, { peeps: ["Peep 1", "Peep 2", "Some text"] });

    mock.onPost("https://localhost:5000/peeps").reply(200);

    render(<PeepsContainer />);

    const textArea = (await screen.findByRole("textbox")) as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = await screen.findByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Some text/)).toBeInTheDocument();
  });
});
