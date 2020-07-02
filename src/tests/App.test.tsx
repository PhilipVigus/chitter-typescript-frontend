import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "../App";

test("renders Chitter static text", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet("https://localhost:5000/peeps").reply(200, { peeps: [] });
  const { findByText } = render(<App />);
  expect(await findByText(/Chitter/)).toBeInTheDocument();
});
