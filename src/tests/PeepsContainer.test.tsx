import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PeepsContainer from "../components/PeepsContainer";

describe("PeepsContainer", () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.onGet("http://localhost:5000/peeps").reply(200, {
      peeps: [
        { text: "Peep 1", timeCreated: 1594030856065 },
        { text: "Peep 2", timeCreated: 1594030856065 }
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
      .onGet("https://localhost:5000/peeps")
      .reply(200, {
        peeps: [
          { text: "Peep 1", timeCreated: 1594030856065 },
          { text: "Peep 2", timeCreated: 1594030856065 }
        ]
      })
      .onGet("http://localhost:5000/peeps")
      .reply(200, {
        peeps: [
          { text: "Peep 1", timeCreated: 1594030856065 },
          { text: "Peep 2", timeCreated: 1594030856065 },
          { text: "Some text", timeCreated: 1594030856065 }
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
});
