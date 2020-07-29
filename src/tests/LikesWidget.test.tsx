import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LikesWidget from "../components/LikesWidget";

describe("LikesWidget", () => {
  describe("initial rendering", () => {
    it("renders the like button when initialised with liked=false", () => {
      render(<LikesWidget likes={[]} liked={false} />);

      expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();
    });

    it("renders the unlike button when initialised with liked=true", () => {
      render(<LikesWidget likes={[]} liked />);

      expect(
        screen.getByRole("button", { name: "Unlike" })
      ).toBeInTheDocument();
    });

    it("renders the number of likes", () => {
      render(<LikesWidget likes={["bob"]} liked={false} />);

      expect(screen.getByText("1")).toBeInTheDocument();
    });
  });

  describe("state changes", () => {
    it("toggles the likes button when it is clicked", () => {
      render(<LikesWidget likes={[]} liked={false} />);

      const likesButton = screen.getByRole("button", { name: "Like" });
      fireEvent.click(likesButton);

      expect(
        screen.getByRole("button", { name: "Unlike" })
      ).toBeInTheDocument();
    });

    it("increments the number when you click the button", () => {
      render(<LikesWidget likes={["bob"]} liked={false} />);

      const likesButton = screen.getByRole("button", { name: "Like" });
      fireEvent.click(likesButton);

      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("decrements the number when you click the button", () => {
      render(<LikesWidget likes={["bob"]} liked />);

      const likesButton = screen.getByRole("button", { name: "Unlike" });
      fireEvent.click(likesButton);

      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });
});
