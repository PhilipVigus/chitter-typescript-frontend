import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import LikesWidget from "../components/LikesWidget";
import { MainContextProvider } from "../contexts/MainContext";

describe("LikesWidget", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    mock.onGet("http://localhost:5000/peeps").reply(200, {
      peeps: []
    });
    mock.onPost("http://localhost:5000/peeps/1/likes").reply(200);
    mock.onDelete("http://localhost:5000/peeps/1/likes/1").reply(200);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  describe("initial rendering", () => {
    it("renders the like button when initialised with liked=false", () => {
      render(
        <LikesWidget likes={[]} liked={false} peepId={1} disabled={false} />
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders the unlike button when initialised with liked=true", () => {
      render(<LikesWidget likes={[]} liked peepId={1} disabled={false} />);

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders the number of likes", () => {
      render(
        <LikesWidget
          likes={["bob"]}
          liked={false}
          peepId={1}
          disabled={false}
        />
      );

      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("renders the button as disabled when set to disabled", () => {
      render(<LikesWidget likes={["bob"]} liked={false} peepId={1} disabled />);

      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("state changes", () => {
    it("toggles the likes button when it is clicked", async () => {
      render(
        <MainContextProvider initialState={{ name: "bob", id: 1 }}>
          <LikesWidget
            likes={["steve", "eric"]}
            liked={false}
            peepId={1}
            disabled={false}
          />
        </MainContextProvider>
      );

      const likesButton = screen.getByRole("button");
      fireEvent.click(likesButton);

      expect(await screen.findByText("3")).toBeInTheDocument();
    });

    it("increments the number when you click the button", async () => {
      render(
        <MainContextProvider initialState={{ name: "bob", id: 1 }}>
          <LikesWidget
            likes={["bob"]}
            liked={false}
            peepId={1}
            disabled={false}
          />
        </MainContextProvider>
      );
      const likesButton = screen.getByRole("button");
      fireEvent.click(likesButton);

      expect(await screen.findByText("2")).toBeInTheDocument();
    });

    it("decrements the number when you click the button", async () => {
      render(
        <MainContextProvider initialState={{ name: "bob", id: 1 }}>
          <LikesWidget likes={["bob"]} liked peepId={1} disabled={false} />
        </MainContextProvider>
      );
      const likesButton = screen.getByRole("button");
      fireEvent.click(likesButton);

      expect(await screen.findByText("0")).toBeInTheDocument();
    });
  });

  describe("sending requests to the server", () => {
    it("posts the like when you click Like", async () => {
      render(
        <MainContextProvider initialState={{ name: "bob", id: 1 }}>
          <LikesWidget likes={[]} liked={false} peepId={1} disabled={false} />
        </MainContextProvider>
      );

      const likesButton = screen.getByRole("button");
      fireEvent.click(likesButton);

      await waitFor(() => {
        expect(mock.history.post[0].data).toBe(JSON.stringify({ userId: 1 }));
      });
    });

    it("deletes the like when you click Like", async () => {
      render(
        <MainContextProvider initialState={{ name: "bob", id: 1 }}>
          <LikesWidget likes={[]} liked peepId={1} disabled={false} />
        </MainContextProvider>
      );

      const likesButton = screen.getByRole("button");
      fireEvent.click(likesButton);

      await waitFor(() => {
        expect(mock.history.delete.length).toBe(1);
      });
    });

    it("errors to console if the POST to likes fails", async () => {
      const original = console.error;
      console.error = jest.fn();
      mock.onPost("http://localhost:5000/peeps/1/likes").reply(404);

      render(
        <MainContextProvider initialState={{ name: "bob", id: 1 }}>
          <LikesWidget likes={[]} liked={false} peepId={1} disabled={false} />
        </MainContextProvider>
      );

      const likesButton = screen.getByRole("button");
      fireEvent.click(likesButton);

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledTimes(1);
      });

      console.error = original;
    });

    it("errors to console if DELETE likes fails", async () => {
      const original = console.error;
      console.error = jest.fn();
      mock.onDelete("http://localhost:5000/peeps/1/likes/1").reply(404);

      render(
        <MainContextProvider initialState={{ name: "bob", id: 1 }}>
          <LikesWidget likes={[]} liked peepId={1} disabled={false} />
        </MainContextProvider>
      );

      const likesButton = screen.getByRole("button");
      fireEvent.click(likesButton);

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledTimes(1);
      });

      console.error = original;
    });
  });
});
