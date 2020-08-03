import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import BACKEND_URL from "../config/config";
import App from "../App";

test("renders Chitter static text", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${BACKEND_URL}/peeps`).reply(200, { peeps: [] });
  render(<App />);
  expect(await screen.findByText(/Chitter/)).toBeInTheDocument();
});
