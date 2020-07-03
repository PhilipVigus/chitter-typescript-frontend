import React from "react";

type PeepsListProps = {
  peeps: string[];
};

const PeepsList: React.FC<PeepsListProps> = ({ peeps }: PeepsListProps) => {
  return (
    <div>
      <div>Peeps List</div>
      {peeps.map((peep) => {
        return <div key={peep}>{peep}</div>;
      })}
    </div>
  );
};

export default PeepsList;
