import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import MainContainer from "../components/MainContainer";
import { MainContextProvider } from "../contexts/MainContext";

describe("MainContainer", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    mock.onGet("http://localhost:5000/peeps").reply(200, {
      peeps: [
        {
          id: 1,
          userId: 1,
          username: "bob",
          text: "Text 1",
          timeCreated: new Date(),
          comments: [],
          likes: []
        },
        {
          id: 2,
          userId: 1,
          username: "bob",
          text: "Text 2",
          timeCreated: new Date(),
          comments: [],
          likes: []
        },
        {
          id: 3,
          userId: 1,
          username: "bob",
          text: "Text 3",
          timeCreated: new Date(),
          comments: [],
          likes: []
        }
      ]
    });
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("renders login form by by default", async () => {
    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router>
          <MainContainer />
        </Router>
      </MainContextProvider>
    );

    expect(
      await screen.findByRole("heading", { name: "Log in" })
    ).toBeInTheDocument();
  });

  it("renders login when you successfully sign up", async () => {
    mock
      .onPost("http://localhost:5000/users")
      .reply(200, { id: 1, username: "steve" });

    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router initialEntries={["/signup"]} initialIndex={0}>
          <MainContainer />
        </Router>
      </MainContextProvider>
    );

    const usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    const passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByRole("heading", { name: "Log in" })
    ).toBeInTheDocument();
  });

  it("renders a the peeps list when you successfully log in", async () => {
    mock
      .onPost("http://localhost:5000/users")
      .reply(200, { id: 1, username: "bob" });

    mock
      .onPost("http://localhost:5000/sessions")
      .reply(200, { id: 1, username: "bob" });

    mock.onGet("http://localhost:5000/peeps").reply(200, {
      peeps: [
        {
          id: 1,
          text: "Peep 1",
          timeCreated: new Date(),
          comments: [],
          likes: []
        },
        {
          id: 2,
          text: "Peep 2",
          timeCreated: new Date(),
          comments: [],
          likes: []
        }
      ]
    });

    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router initialEntries={["/signup"]} initialIndex={0}>
          <MainContainer />
        </Router>
      </MainContextProvider>
    );

    let usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    let passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByRole("heading", { name: "Log in" })
    ).toBeInTheDocument();

    usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText(/Peep 2/)).toBeInTheDocument();
  });

  it("logs you out and redirects to login when you click logout", async () => {
    mock
      .onPost("http://localhost:5000/users")
      .reply(200, { id: 1, username: "bob" });

    mock
      .onPost("http://localhost:5000/sessions")
      .reply(200, { id: 1, username: "bob" });

    mock.onGet("http://localhost:5000/peeps").reply(200, {
      peeps: [
        {
          id: 1,
          text: "Peep 1",
          timeCreated: new Date(),
          comments: [],
          likes: []
        },
        {
          id: 2,
          text: "Peep 2",
          timeCreated: new Date(),
          comments: [],
          likes: []
        }
      ]
    });

    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router initialEntries={["/signup"]} initialIndex={0}>
          <MainContainer />
        </Router>
      </MainContextProvider>
    );

    let usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    let passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByRole("heading", { name: "Log in" })
    ).toBeInTheDocument();

    usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    const logout = await screen.findByText(/Log out/);
    fireEvent.click(logout);
    expect(
      await screen.findByRole("heading", { name: "Log in" })
    ).toBeInTheDocument();
  });

  it("redirects to login if you try to get the peeps list without logging", async () => {
    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router initialEntries={["/peeps"]} initialIndex={0}>
          <MainContainer />
        </Router>
      </MainContextProvider>
    );

    expect(
      await screen.findByRole("heading", { name: "Log in" })
    ).toBeInTheDocument();
  });

  it("renders a peep when you click on it in the list", async () => {
    mock
      .onPost("http://localhost:5000/users")
      .reply(200, { id: 1, username: "bob" });

    mock
      .onPost("http://localhost:5000/sessions")
      .reply(200, { id: 1, username: "bob" });

    mock.onGet("http://localhost:5000/peeps").reply(200, {
      peeps: [
        {
          id: 1,
          text: "Peep 1",
          timeCreated: new Date(),
          comments: [],
          likes: []
        },
        {
          id: 2,
          text: "Peep 2",
          timeCreated: new Date(),
          comments: [],
          likes: []
        }
      ]
    });

    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router initialEntries={["/signup"]} initialIndex={0}>
          <MainContainer />
        </Router>
      </MainContextProvider>
    );

    let usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    let passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByRole("heading", { name: "Log in" })
    ).toBeInTheDocument();

    usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    const peepSummary = await screen.findByText(/Peep 2/);
    fireEvent.click(peepSummary);

    expect(await screen.findByText(/Peep 2/)).toBeInTheDocument();
  });

  it("errors to console if the peeps list fails to load", async () => {
    const original = console.error;
    console.error = jest.fn();

    mock
      .onPost("http://localhost:5000/users")
      .reply(200, { id: 1, username: "bob" });

    mock
      .onPost("http://localhost:5000/sessions")
      .reply(200, { id: 1, username: "bob" });

    mock.onGet("http://localhost:5000/peeps").reply(404);

    render(
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router initialEntries={["/signup"]} initialIndex={0}>
          <MainContainer />
        </Router>
      </MainContextProvider>
    );

    let usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    let passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByRole("heading", { name: "Log in" })
    ).toBeInTheDocument();

    usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "steve" } });
    passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "1Abcdefgh2" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
    });
    console.error = original;
  });
});
