import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import LikesWidget from "../components/LikesWidget";
import { MainContextProvider } from "../contexts/MainContext";

describe("LikesWidget", () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.onGet("http://localhost:5000/peeps").reply(200, {
      peeps: []
    });
    mock.onPost("http://localhost:5000/peeps/1/likes").reply(200);
    mock.onDelete("http://localhost:5000/peeps/1/likes/bob").reply(200);
  });

  afterAll(() => {
    mock.restore();
  });

  describe("initial rendering", () => {
    it("renders the like button when initialised with liked=false", () => {
      render(<LikesWidget likes={[]} liked={false} peepId={1} />);

      expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();
    });

    it("renders the unlike button when initialised with liked=true", () => {
      render(<LikesWidget likes={[]} liked peepId={1} />);

      expect(
        screen.getByRole("button", { name: "Unlike" })
      ).toBeInTheDocument();
    });

    it("renders the number of likes", () => {
      render(<LikesWidget likes={["bob"]} liked={false} peepId={1} />);

      expect(screen.getByText("1")).toBeInTheDocument();
    });
  });

  describe("state changes", () => {
    it("toggles the likes button when it is clicked", async () => {
      render(
        <MainContextProvider initialState={{ name: "bob", id: 0 }}>
          <LikesWidget likes={[]} liked={false} peepId={1} />
        </MainContextProvider>
      );

      const likesButton = screen.getByRole("button", { name: "Like" });
      fireEvent.click(likesButton);

      expect(
        await screen.findByRole("button", { name: "Unlike" })
      ).toBeInTheDocument();
    });

    it("increments the number when you click the button", async () => {
      render(
        <MainContextProvider initialState={{ name: "bob", id: 0 }}>
          <LikesWidget likes={["bob"]} liked={false} peepId={1} />
        </MainContextProvider>
      );
      const likesButton = screen.getByRole("button", { name: "Like" });
      fireEvent.click(likesButton);

      expect(await screen.findByText("2")).toBeInTheDocument();
    });

    it("decrements the number when you click the button", async () => {
      render(
        <MainContextProvider initialState={{ name: "bob", id: 0 }}>
          <LikesWidget likes={["bob"]} liked peepId={1} />
        </MainContextProvider>
      );
      const likesButton = screen.getByRole("button", { name: "Unlike" });
      fireEvent.click(likesButton);

      expect(await screen.findByText("0")).toBeInTheDocument();
    });
  });

  describe("sending requests to the server", () => {
    it("posts the like when you click Like", async () => {
      render(
        <MainContextProvider initialState={{ name: "bob", id: 0 }}>
          <LikesWidget likes={[]} liked={false} peepId={1} />
        </MainContextProvider>
      );

      const likesButton = screen.getByRole("button", { name: "Like" });
      fireEvent.click(likesButton);

      await waitFor(() => {
        expect(mock.history.post[0].data).toBe(
          JSON.stringify({ username: "bob" })
        );
      });
    });
  });
});
