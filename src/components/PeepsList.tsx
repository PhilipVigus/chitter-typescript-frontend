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
          if (new Date(a._timeCreated) < new Date(b._timeCreated)) {
            return 1;
          } else {
            return -1;
          }
        })
        .map((peep) => {
          return (
            <Peep
              key={peep._id}
              _id={peep._id}
              _userID={peep._userID}
              _username={peep._username}
              _text={peep._text}
              _timeCreated={peep._timeCreated}
            />
          );
        })}
    </div>
  );
};

export default PeepsList;
