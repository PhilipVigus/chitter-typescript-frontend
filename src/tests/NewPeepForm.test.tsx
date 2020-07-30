import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import NewPeepForm from "../components/NewPeepForm";

describe("NewPeepForm", () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.onPost("http://localhost:5000/peeps").reply(200);
  });

  afterAll(() => {
    mock.restore();
  });

  it("posts the peep when you click submit", async () => {
    render(<NewPeepForm />);

    const textArea = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = screen.getByRole("button", { name: "Tell the world" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mock.history.post[0].data).toBe(
        JSON.stringify({ text: "Some text" })
      );
    });
  });

  it("clears its contents when you click submit", async () => {
    render(<NewPeepForm />);

    const textArea = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = screen.getByRole("button", { name: "Tell the world" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(textArea.value).toBe("");
    });
  });
});
