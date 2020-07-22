import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("LoginForm", () => {
  const mock = new MockAdapter(axios);

  afterAll(() => {
    mock.restore();
  });

  it("renders the username textbox", () => {
    render(<LoginForm />);

    expect(screen.getByRole("heading", { name: "Log in" })).toBeInTheDocument();
  });

  it("renders the text boxes", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
  });

  it("renders a message when you successfully log in", async () => {
    mock
      .onPost("http://localhost:5000/sessions")
      .reply(200, { id: 1, username: "bob" });

    render(<LoginForm />);

    const usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "bob" } });
    const passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText(/1 - bob/)).toBeInTheDocument();
  });
});