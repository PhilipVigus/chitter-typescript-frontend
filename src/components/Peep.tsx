import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";
import { PeepSummaryProps } from "./PeepSummary";

const Peep: React.FC = () => {
  const [, , peeps] = useContext(MainContext);
  const { id } = useParams();
  const [peep] = useState<PeepSummaryProps | undefined>();

  const getTimeCreatedString = (timeCreated: string) => {
    const date = new Date(timeCreated);

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
  };

  const getPeep = (): string | undefined => {
    const idAsNumber = parseInt(id, 10);
    for (let i = 0; i < peeps.length; i += 1) {
      if (peeps[i].id === idAsNumber) {
        return `${peeps[i].username} - ${
          peeps[i].text
        } - ${getTimeCreatedString(peeps[i].timeCreated)}`;
      }
    }

    return undefined;
  };

  return (
    <div>
      {peep?.id}
      <h2>Individual peep</h2>
      {getPeep()}
    </div>
  );
};

export default Peep;
