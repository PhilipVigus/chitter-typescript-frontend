import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { MainContextProvider } from "./contexts/MainContext";
import MainContainer from "./components/MainContainer";

function App(): JSX.Element {
  return (
    <div>
      <MainContextProvider initialState={{ name: "", id: 0 }}>
        <Router>
          <MainContainer />
        </Router>
      </MainContextProvider>
    </div>
  );
}

export default App;
