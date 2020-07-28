import React from "react";
import { render, screen } from "@testing-library/react";
import NewCommentForm from "../components/NewCommentForm";

describe("NewPeepForm", () => {
  it("renders static text", async () => {
    render(<NewCommentForm />);

    expect(await screen.findByText(/New Comment/)).toBeInTheDocument();
  });
});
