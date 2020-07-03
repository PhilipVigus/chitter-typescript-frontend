import React from "react";
import "./App.css";
import PeepsContainer from "./components/PeepsContainer";

function App(): JSX.Element {
  return (
    <div>
      <div>Chitter</div>
      <PeepsContainer />
    </div>
  );
}

export default App;
