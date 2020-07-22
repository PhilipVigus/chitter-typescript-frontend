import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import MainContainer from "./components/MainContainer";

function App(): JSX.Element {
  return (
    <div>
      <div>Chitter</div>
      <Router>
        <MainContainer />
      </Router>
    </div>
  );
}

export default App;
