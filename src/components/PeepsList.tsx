import React, { useContext } from "react";
import PeepSummary from "./PeepSummary";
import { MainContext, PeepProps } from "../contexts/MainContext";

const PeepsList: React.FC = () => {
  const [, , newPeeps] = useContext(MainContext);

  return (
    <div>
      {newPeeps
        .sort((a: PeepProps, b: PeepProps) => {
          if (
            new Date(a.timeCreated).getTime() <
            new Date(b.timeCreated).getTime()
          ) {
            return 1;
          } else {
            return -1;
          }
        })
        .map((peep) => {
          return (
            <PeepSummary
              key={peep.id}
              id={peep.id}
              userId={peep.userId}
              username={peep.username}
              text={peep.text}
              timeCreated={peep.timeCreated}
              comments={peep.comments}
              likes={peep.likes}
            />
          );
        })}
    </div>
  );
};

export default PeepsList;
