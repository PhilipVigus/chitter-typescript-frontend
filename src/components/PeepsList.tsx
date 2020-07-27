import React from "react";
import PeepSummary, { PeepSummaryProps } from "./PeepSummary";

type PeepsListProps = {
  peeps: PeepSummaryProps[];
};

const PeepsList: React.FC<PeepsListProps> = ({ peeps }: PeepsListProps) => {
  return (
    <div>
      <div>Peeps List</div>
      {peeps
        .sort((a: PeepSummaryProps, b: PeepSummaryProps) => {
          if (new Date(a.timeCreated) < new Date(b.timeCreated)) {
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
            />
          );
        })}
    </div>
  );
};

export default PeepsList;
