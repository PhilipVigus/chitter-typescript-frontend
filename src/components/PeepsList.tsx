import React from "react";
import Peep, { PeepProps } from "./Peep";

type PeepsListProps = {
  peeps: PeepProps[];
};

const PeepsList: React.FC<PeepsListProps> = ({ peeps }: PeepsListProps) => {
  return (
    <div>
      <div>Peeps List</div>
      {peeps
        .sort((a: PeepProps, b: PeepProps) => {
          if (new Date(a.timeCreated) < new Date(b.timeCreated)) {
            return 1;
          } else {
            return -1;
          }
        })
        .map((peep) => {
          return (
            <Peep
              key={peep.id}
              id={peep.id}
              userId={peep.userId}
              username={peep.username}
              text={peep.text}
              timeCreated={peep.timeCreated}
            />
          );
        })}
    </div>
  );
};

export default PeepsList;
