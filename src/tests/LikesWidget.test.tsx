import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LikesWidget from "../components/LikesWidget";

describe("LikesWidget", () => {
  it("renders the likes button", () => {
    render(<LikesWidget likes={[]} />);

    expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();
  });

  it("renders the number of likes", () => {
    render(<LikesWidget likes={["bob"]} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("toggles the likes button when it is clicked", () => {
    render(<LikesWidget likes={["bob"]} />);

    const likesButton = screen.getByRole("button", { name: "Like" });
    fireEvent.click(likesButton);

    expect(screen.getByRole("button", { name: "Unlike" })).toBeInTheDocument();
  });

  it("increments the number when you click the button", () => {
    render(<LikesWidget likes={["bob"]} />);

    const likesButton = screen.getByRole("button", { name: "Like" });
    fireEvent.click(likesButton);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("decrements the number when you click the button", () => {
    render(<LikesWidget likes={["bob"]} />);

    const likesButton = screen.getByRole("button", { name: "Like" });
    fireEvent.click(likesButton);
    fireEvent.click(likesButton);

    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
