import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import MainContainer from "../components/MainContainer";

test("renders signup form", () => {
  const mock = new MockAdapter(axios);
  mock.onGet("http://localhost:5000/peeps").reply(200, { peeps: [] });
  render(
    <Router>
      <MainContainer />
    </Router>
  );

  expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
});
