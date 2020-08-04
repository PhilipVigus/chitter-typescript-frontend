import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import BACKEND_URL from "../config/config";
import NewPeepForm from "../components/NewPeepForm";

describe("NewPeepForm", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    mock.onPost(`${BACKEND_URL}/peeps`).reply(200);
  });

  afterEach(() => {
    mock.reset();
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

  it("doesnt post the peep if it is empty", async () => {
    render(<NewPeepForm />);

    const submitButton = screen.getByRole("button", { name: "Tell the world" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mock.history.post.length).toBe(0);
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

  it("errors to console with the peep submit fails", async () => {
    const original = console.error;
    console.error = jest.fn();

    mock.onPost(`${BACKEND_URL}/peeps`).reply(404);

    render(<NewPeepForm />);

    const textArea = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = screen.getByRole("button", { name: "Tell the world" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    console.error = original;
  });
});
