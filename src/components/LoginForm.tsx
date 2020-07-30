import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { MainContext } from "../contexts/MainContext";
import "./LoginForm.css";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const history = useHistory();
  const [, setUserState] = useContext(MainContext);

  const handleLoginSubmit = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const data = { username, password };

    const sendLogin = async () => {
      axios
        .post("http://localhost:5000/sessions", data, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          setUserState({
            name: cookie.load("username"),
            id: cookie.load("id")
          });
          history.push("/peeps");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setErrorMessage(error.response.data.error);
          } else {
            console.log(error);
          }
        });
    };

    sendLogin();
  };

  return (
    <div className="login-form__container">
      <div className="login-form__header">Log in</div>
      <div className="login-form__text-container">
        <div>
          <label className="login-form__label" htmlFor="username">
            Username
            <div>
              <input
                className="login-form__input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </label>
        </div>
        <div>
          <label className="login-form__label" htmlFor="password">
            Password
            <input
              className="login-form__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button
            className="login-form__button"
            type="submit"
            onClick={handleLoginSubmit}
          >
            Submit
          </button>
        </div>
        <div className="login-form__error-message">{errorMessage}</div>
      </div>
    </div>
  );
};

export default LoginForm;
