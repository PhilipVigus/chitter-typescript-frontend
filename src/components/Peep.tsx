import React from "react";
import { useParams } from "react-router-dom";

const Peep: React.FC = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Individual peep</h2>
      {id}
    </div>
  );
};

export default Peep;
