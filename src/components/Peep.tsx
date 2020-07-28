import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { MainContext, PeepProps } from "../contexts/MainContext";
import NewCommentForm from "../components/NewCommentForm";

const Peep: React.FC = () => {
  const [, , peeps] = useContext(MainContext);
  const { id } = useParams();
  const [peep] = useState<PeepProps | undefined>();

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
      <NewCommentForm peepId={id} />
    </div>
  );
};

export default Peep;
