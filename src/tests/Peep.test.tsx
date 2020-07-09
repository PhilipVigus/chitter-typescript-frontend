import React from "react";
import { render, screen } from "@testing-library/react";
import Peep, { PeepProps } from "../components/Peep";

describe("Peep", () => {
  const date = new Date(2020, 5, 3, 11, 5, 23);
  const data: PeepProps = {
    _id: 1,
    _text: "Peep text",
    _timeCreated: date
  };

  it("renders the text", () => {
    render(
      <Peep
        key={data._id}
        _id={data._id}
        _text={data._text}
        _timeCreated={data._timeCreated}
      />
    );

    expect(screen.getByText(/Peep text/)).toBeInTheDocument();
  });

  it("renders the time created", () => {
    render(
      <Peep
        key={data._id}
        _id={data._id}
        _text={data._text}
        _timeCreated={data._timeCreated}
      />
    );
    expect(screen.getByText(/11:5:23 on 3-6-2020/)).toBeInTheDocument();
  });
});
