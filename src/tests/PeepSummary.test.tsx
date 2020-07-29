import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
    comments: []
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
          comments={data.comments}
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
          comments={data.comments}
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
          comments={data.comments}
        />
      </Router>
    );

    expect(screen.getByText(/0 comments/)).toBeInTheDocument();
  });

  it("renders the likes button", () => {
    render(
      <Router>
        <PeepSummary
          key={data.id}
          id={data.id}
          userId={data.userId}
          username={data.username}
          text={data.text}
          timeCreated={data.timeCreated}
          comments={data.comments}
        />
      </Router>
    );

    expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();
  });

  it("toggles the likes button when it is clicked", () => {
    render(
      <Router>
        <PeepSummary
          key={data.id}
          id={data.id}
          userId={data.userId}
          username={data.username}
          text={data.text}
          timeCreated={data.timeCreated}
          comments={data.comments}
        />
      </Router>
    );

    const likesButton = screen.getByRole("button", { name: "Like" });
    fireEvent.click(likesButton);

    expect(screen.getByRole("button", { name: "Unlike" })).toBeInTheDocument();
  });
});
