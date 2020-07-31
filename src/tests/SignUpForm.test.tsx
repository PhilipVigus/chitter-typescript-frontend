import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SignUpForm from "../components/SignUpForm";

describe("SignupForm", () => {
  const mock = new MockAdapter(axios);

  afterAll(() => {
    mock.restore();
  });

  it("renders the username textbox", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
  });

  it("renders the password textbox", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
  });

  it("posts the information to the server when you click signup", async () => {
    mock
      .onPost("http://localhost:5000/users")
      .reply(200, { id: 1, username: "steve" });
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    const usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    const passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mock.history.post[0].data).toBe(
        JSON.stringify({ username: "steve", password: "1234" })
      );
    });
  });

  it("displays an error if signup is unsuccessful", async () => {
    mock
      .onPost("http://localhost:5000/users")
      .reply(422, { error: "Username already taken" });
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    const usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    const passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText(/Username already taken/)
    ).toBeInTheDocument();
  });

  describe("input validation", () => {
    it("displays an error message if the username is too short", async () => {
      render(
        <Router>
          <SignUpForm />
        </Router>
      );

      const usernameField = screen.getByRole("textbox", {
        name: "Username"
      }) as HTMLInputElement;

      fireEvent.change(usernameField, { target: { value: "Bob" } });
      const passwordField = screen.getByLabelText(
        /Password/
      ) as HTMLInputElement;

      fireEvent.change(passwordField, { target: { value: "1234" } });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));

      expect(
        await screen.findByText(/Username must be at least 4 characters long/)
      ).toBeInTheDocument();
    });
  });
});
