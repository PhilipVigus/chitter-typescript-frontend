import React from "react";
import PeepsList from "./components/PeepsList";
import "./App.css";

function App(): JSX.Element {
  return (
    <div>
      <div>Chitter</div>
      <PeepsList />
    </div>
  );
}

export default App;
