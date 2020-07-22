import React from "react";
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
    render(<SignUpForm />);

    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
  });

  it("renders the password textbox", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
  });

  it("posts the information to the server when you click signup", async () => {
    mock.onPost("http://localhost:5000/users").reply(200);
    render(<SignUpForm />);

    const usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "Bob" } });
    const passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mock.history.post[0].data).toBe(
        JSON.stringify({ username: "Bob", password: "1234" })
      );
    });
  });

  it("displays an error if signup is unsuccessful", async () => {
    mock
      .onPost("http://localhost:5000/users")
      .reply(422, { error: "Username already taken" });
    render(<SignUpForm />);

    const usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "Bob" } });
    const passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText(/Username already taken/)
    ).toBeInTheDocument();
  });
});
