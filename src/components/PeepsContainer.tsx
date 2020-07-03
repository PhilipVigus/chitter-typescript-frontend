import React from "react";
import NewPeepForm from "./NewPeepForm";
import PeepsList from "./PeepsList";

const PeepsContainer: React.FC = () => {
  const onNewPeep = () => {
    console.log("new peep");
  };

  return (
    <div>
      <NewPeepForm newPeepCallback={onNewPeep} />
      <PeepsList />
    </div>
  );
};

export default PeepsContainer;
