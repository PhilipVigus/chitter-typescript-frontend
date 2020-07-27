import React from "react";

export type PeepProps = {
  id: number;
  userId: number;
  username: string;
  text: string;
  timeCreated: Date;
};

const Peep: React.FC = () => {
  return (
    <div>
      <h2>Individual peep</h2>
    </div>
  );
};

export default Peep;
