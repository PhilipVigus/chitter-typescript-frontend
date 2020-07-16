import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SignUpForm from "../components/SignUpForm";

describe("SignupForm", () => {
  const mock = new MockAdapter(axios);

  it("renders the username textbox", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
  });

  it("renders the password textbox", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
  });

  it("posts the information when you click signup", async () => {
    mock.onPost("https://localhost:5000/signup").reply(200);
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

    mock.restore();
  });
});
