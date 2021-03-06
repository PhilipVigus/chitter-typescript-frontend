import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../config/config";
import { MainContext } from "../contexts/MainContext";
import "./AuthorisationForm.css";

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
        .post(`${BACKEND_URL}/sessions`, data)
        .then((res) => {
          setUserState({
            name: res.data.username,
            id: res.data.id
          });
          history.push("/peeps");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setErrorMessage(error.response.data.error);
          } else {
            console.error(error);
          }
        });
    };

    sendLogin();
  };

  return (
    <>
      <div className="authorisation-form__container">
        <h2 className="authorisation-form__header">Log in</h2>
        <div className="authorisation-form__text-container">
          <div>
            <label className="authorisation-form__label" htmlFor="username">
              Username
              <div>
                <input
                  className="authorisation-form__input"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div>
            <label className="authorisation-form__label" htmlFor="password">
              Password
              <input
                className="authorisation-form__input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button
              className="authorisation-form__button"
              type="submit"
              onClick={handleLoginSubmit}
            >
              Submit
            </button>
          </div>
          {errorMessage !== "" && (
            <div className="authorisation-form__error-message">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
      <div className="authorisation-form__link-message">
        <Link className="authorisation-form__link" to="/signup">
          Sign up
        </Link>{" "}
        if you don&apos;t have an account
      </div>
    </>
  );
};

export default LoginForm;
