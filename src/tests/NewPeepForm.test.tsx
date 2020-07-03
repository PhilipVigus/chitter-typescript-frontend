import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NewPeepForm from "../components/NewPeepForm";

describe("NewPeepForm", () => {
  it("renders static text", async () => {
    render(<NewPeepForm />);

    expect(await screen.findByText(/New Peep/)).toBeInTheDocument();
  });

  it("renders a text area you can type in", () => {
    render(<NewPeepForm />);
    const textArea = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(textArea, { target: { value: "Some text" } });
    expect(textArea.value).toBe("Some text");
  });

  it("renders a submit button for the new peep", () => {
    render(<NewPeepForm />);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});
