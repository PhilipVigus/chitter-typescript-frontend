import React, { useContext } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import PeepsContainer from "./PeepsContainer";
import Peep from "./Peep";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { MainContext } from "../contexts/MainContext";
import ProtectedRoute from "./ProtectedRoute";
import "./MainContainer.css";

const MainContainer: React.FC = () => {
  const [userState, setUserState] = useContext(MainContext);

  const handleLogoutClick = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    evt.preventDefault();
    setUserState({ name: "", id: 0 });
  };
  return (
    <div>
      <header>
        <div>Chitter</div>
        <div className="logout-link">
          {userState.id !== 0 && (
            <Link to="/login" onClick={handleLogoutClick}>
              Log out
            </Link>
          )}
        </div>
      </header>

      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/peeps" component={PeepsContainer} />
        <ProtectedRoute path="/peeps/:id" component={Peep} />
      </Switch>
    </div>
  );
};

export default MainContainer;
