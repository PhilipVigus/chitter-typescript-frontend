import React from "react";
import Peep, { PeepProps } from "./Peep";

type PeepsListProps = {
  peeps: PeepProps[];
};

const PeepsList: React.FC<PeepsListProps> = ({ peeps }: PeepsListProps) => {
  return (
    <div>
      <div>Peeps List</div>
      {peeps.map((peep) => {
        return <Peep key={peep.text} text={peep.text} />;
      })}
    </div>
  );
};

export default PeepsList;
