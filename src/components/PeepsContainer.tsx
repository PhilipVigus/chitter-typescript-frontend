import React, { useContext } from "react";
import NewPeepForm from "./NewPeepForm";
import PeepsList from "./PeepsList";
import { MainContext } from "../contexts/MainContext";
import "./PeepsContainer.css";

const PeepsContainer: React.FC = () => {
  const [userState] = useContext(MainContext);

  return (
    <div className="peeps-container">
      {userState.name}
      <NewPeepForm />
      <PeepsList />
    </div>
  );
};

export default PeepsContainer;
