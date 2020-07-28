import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import PeepSummary from "../components/PeepSummary";
import { PeepProps } from "../contexts/MainContext";

describe("PeepSummary", () => {
  const date = new Date(2020, 5, 3, 11, 5, 23);
  const data: PeepProps = {
    id: 1,
    userId: 1,
    username: "bob",
    text: "Peep text",
    timeCreated: date.toString(),
    numberOfComments: 5
  };

  it("renders the text", () => {
    render(
      <Router>
        <PeepSummary
          key={data.id}
          id={data.id}
          userId={data.userId}
          username={data.username}
          text={data.text}
          timeCreated={data.timeCreated}
          numberOfComments={data.numberOfComments}
        />
      </Router>
    );

    expect(screen.getByText(/bob -/)).toBeInTheDocument();
  });

  it("renders the time created", () => {
    render(
      <Router>
        <PeepSummary
          key={data.id}
          id={data.id}
          userId={data.userId}
          username={data.username}
          text={data.text}
          timeCreated={data.timeCreated}
          numberOfComments={data.numberOfComments}
        />
      </Router>
    );
    expect(screen.getByText(/11:5:23 on 3-6-2020/)).toBeInTheDocument();
  });

  it("renders the number of comments", () => {
    render(
      <Router>
        <PeepSummary
          key={data.id}
          id={data.id}
          userId={data.userId}
          username={data.username}
          text={data.text}
          timeCreated={data.timeCreated}
          numberOfComments={data.numberOfComments}
        />
      </Router>
    );

    expect(screen.getByText(/5 comments/)).toBeInTheDocument();
  });
});
