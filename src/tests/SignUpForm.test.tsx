import React from "react";
import { render, screen } from "@testing-library/react";
import SignUpForm from "../components/SignUpForm";

describe("SignupForm", () => {
  it("renders the username textbox", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
  });

  it("renders the password textbox", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
  });
});
