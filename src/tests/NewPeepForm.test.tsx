import React from "react";
import { fireEvent, render } from "@testing-library/react";
import NewPeepForm from "../components/NewPeepForm";

describe("NewPeepForm", () => {
  it("renders static text", async () => {
    const { findByText } = render(<NewPeepForm />);

    expect(await findByText(/New Peep/)).toBeInTheDocument();
  });

  it("renders a text area you can type in", () => {
    const { getByRole } = render(<NewPeepForm />);
    const textArea = getByRole("textbox");
    fireEvent.change(textArea, { target: { value: "Some text" } });
    expect(textArea.value).toBe("Some text");
  });
});
