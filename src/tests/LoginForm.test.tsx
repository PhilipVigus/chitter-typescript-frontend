import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import LoginForm from "../components/LoginForm";

describe("LoginForm", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("renders the username textbox", () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    expect(screen.getByRole("heading", { name: "Log in" })).toBeInTheDocument();
  });

  it("renders the text boxes", () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
  });

  it("renders an error when log in is unsuccessful", async () => {
    mock
      .onPost("http://localhost:5000/sessions")
      .reply(422, { error: "Incorrect login details" });

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    const usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "bob" } });
    const passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText(/Incorrect login details/)
    ).toBeInTheDocument();
  });

  it("errors to console for other errors", async () => {
    mock.onPost("http://localhost:5000/sessions").reply(404);
    const original = console.error;
    console.error = jest.fn();
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    const usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "bob" } });
    const passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    console.error = original;
  });
});
