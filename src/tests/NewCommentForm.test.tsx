import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import NewCommentForm from "../components/NewCommentForm";
import { MainContextProvider } from "../contexts/MainContext";

describe("NewPeepForm", () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.onPost("http://localhost:5000/peeps/1/comments").reply(200);
    mock.onGet("http://localhost:5000/peeps").reply(200, {
      peeps: [
        {
          id: 1,
          username: "bob",
          text: "Peep 1",
          timeCreated: Date.now(),
          comments: [],
          likes: []
        },
        {
          id: 2,
          username: "bob",
          text: "Peep 2",
          timeCreated: Date.now(),
          comments: [],
          likes: []
        }
      ]
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it("posts the comment when you click submit", async () => {
    render(
      <MainContextProvider initialState={{ name: "", id: 5 }}>
        <NewCommentForm peepId={1} />
      </MainContextProvider>
    );

    const textArea = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mock.history.post[0].data).toBe(
        JSON.stringify({ userId: 5, peepId: 1, text: "Some text" })
      );
    });
  });

  it("clears its contents when you click submit", async () => {
    render(
      <MainContextProvider initialState={{ name: "", id: 5 }}>
        <NewCommentForm peepId={1} />
      </MainContextProvider>
    );

    const textArea = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(textArea.value).toBe("");
    });
  });
});
