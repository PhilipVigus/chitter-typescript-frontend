import React from "react";
import { render, screen } from "@testing-library/react";
import PeepSummary, { PeepSummaryProps } from "../components/PeepSummary";

describe("PeepSummary", () => {
  const date = new Date(2020, 5, 3, 11, 5, 23);
  const data: PeepSummaryProps = {
    id: 1,
    userId: 1,
    username: "bob",
    text: "Peep text",
    timeCreated: date
  };

  it("renders the text", () => {
    render(
      <PeepSummary
        key={data.id}
        id={data.id}
        userId={data.userId}
        username={data.username}
        text={data.text}
        timeCreated={data.timeCreated}
      />
    );

    expect(screen.getByText(/bob -/)).toBeInTheDocument();
  });

  it("renders the time created", () => {
    render(
      <PeepSummary
        key={data.id}
        id={data.id}
        userId={data.userId}
        username={data.username}
        text={data.text}
        timeCreated={data.timeCreated}
      />
    );
    expect(screen.getByText(/11:5:23 on 3-6-2020/)).toBeInTheDocument();
  });
});
