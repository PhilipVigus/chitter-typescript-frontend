import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import MainContainer from "../components/MainContainer";

describe("MainContainer", () => {
  const mock = new MockAdapter(axios);

  afterAll(() => {
    mock.restore();
  });

  it("renders login form by by default", () => {
    render(
      <Router>
        <MainContainer />
      </Router>
    );

    expect(screen.getByRole("heading", { name: "Log in" })).toBeInTheDocument();
  });

  it("renders renders login when you successfully sign up", async () => {
    mock
      .onPost("http://localhost:5000/users")
      .reply(200, { id: 1, username: "bob" });

    render(
      <Router initialEntries={["/signup"]} initialIndex={0}>
        <MainContainer />
      </Router>
    );

    const usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "bob" } });
    const passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1234" } });
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
        { _id: 1, _text: "Peep 1", _timeCreated: new Date() },
        { _id: 2, _text: "Peep 2", _timeCreated: new Date() }
      ]
    });

    render(
      <Router initialEntries={["/signup"]} initialIndex={0}>
        <MainContainer />
      </Router>
    );

    let usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "bob" } });
    let passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;

    fireEvent.change(passwordField, { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByRole("heading", { name: "Log in" })
    ).toBeInTheDocument();

    usernameField = screen.getByRole("textbox", {
      name: "Username"
    }) as HTMLInputElement;

    fireEvent.change(usernameField, { target: { value: "bob" } });
    passwordField = screen.getByLabelText(/Password/) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Peeps List")).toBeInTheDocument();
  });

  it("redirects to login if you try to get the peeps list without logging", () => {
    render(
      <Router initialEntries={["/peeps"]} initialIndex={0}>
        <MainContainer />
      </Router>
    );

    expect(screen.getByRole("heading", { name: "Log in" })).toBeInTheDocument();
  });
});
