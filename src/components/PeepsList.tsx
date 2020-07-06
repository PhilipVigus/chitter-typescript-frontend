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
          return a.timeCreated - b.timeCreated;
        })
        .map((peep) => {
          return (
            <Peep
              key={peep.text}
              text={peep.text}
              timeCreated={peep.timeCreated}
            />
          );
        })}
    </div>
  );
};

export default PeepsList;
