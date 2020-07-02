import React, { useState } from "react";

const PeepsList: React.FC = () => {
  const [peeps, setPeeps] = useState([
    "This is a peep",
    "This is another peep"
  ]);
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
