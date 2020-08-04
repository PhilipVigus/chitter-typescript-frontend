import React from "react";
import NewPeepForm from "./NewPeepForm";
import PeepsList from "./PeepsList";
import "./PeepsContainer.css";

const PeepsContainer: React.FC = () => {
  return (
    <div className="peeps-container">
      <NewPeepForm />
      <PeepsList />
    </div>
  );
};

export default PeepsContainer;
