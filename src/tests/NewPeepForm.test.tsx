import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import NewPeepForm from "../components/NewPeepForm";

describe("NewPeepForm", () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.onPost("https://localhost:5000/peeps").reply(200);
  });

  afterAll(() => {
    mock.restore();
  });

  it("renders static text", async () => {
    render(<NewPeepForm newPeepCallback={() => {}} />);

    expect(await screen.findByText(/New Peep/)).toBeInTheDocument();
  });

  it("posts the peep when you click submit", async () => {
    render(<NewPeepForm newPeepCallback={() => {}} />);

    const textArea = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mock.history.post[0].data).toBe(
        JSON.stringify({ text: "Some text" })
      );
    });
  });

  it("clears its contents when you click submit", async () => {
    render(<NewPeepForm newPeepCallback={() => {}} />);

    const textArea = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(textArea.value).toBe("");
    });
  });

  it("calls the callback when you click submit", async () => {
    const mockCallback = jest.fn();
    render(<NewPeepForm newPeepCallback={mockCallback} />);

    const textArea = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
