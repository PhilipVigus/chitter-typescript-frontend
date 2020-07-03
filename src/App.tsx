import React from "react";
import PeepsList from "./components/PeepsList";
import NewPeepForm from "./components/NewPeepForm";
import "./App.css";

function App(): JSX.Element {
  return (
    <div>
      <div>Chitter</div>
      <NewPeepForm />
      <PeepsList />
    </div>
  );
}

export default App;
