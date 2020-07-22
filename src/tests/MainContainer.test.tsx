import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import MainContainer from "../components/MainContainer";

describe("MainContainer", () => {
  const mock = new MockAdapter(axios);

  afterAll(() => {
    mock.restore();
  });

  it("renders signup form by by default", () => {
    render(
      <Router>
        <MainContainer />
      </Router>
    );

    expect(
      screen.getByRole("heading", { name: "Sign up" })
    ).toBeInTheDocument();
  });

  it("renders renders login when you successfully sign up", async () => {
    mock
      .onPost("http://localhost:5000/users")
      .reply(200, { id: 1, username: "bob" });

    render(
      <Router>
        <MainContainer />
      </Router>
    );

    const usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "bob" } });
    const passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByRole("heading", { name: "Log in" })
    ).toBeInTheDocument();
  });
});