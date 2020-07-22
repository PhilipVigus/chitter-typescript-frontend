import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const history = useHistory();

  const handleLoginSubmit = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const data = { username, password };

    const sendLogin = async () => {
      axios
        .post("http://localhost:5000/sessions", data)
        .then(() => {
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
    <div>
      <h2>Log in</h2>
      <div>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          Password
        </label>
      </div>
      <div>
        <button type="submit" onClick={handleLoginSubmit}>
          Submit
        </button>
      </div>
      <div>{errorMessage}</div>
    </div>
  );
};

export default LoginForm;
