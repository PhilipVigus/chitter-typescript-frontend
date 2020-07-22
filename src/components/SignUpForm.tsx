import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const history = useHistory();

  const handleSignupSubmit = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const data = { username, password };

    const sendSignup = async () => {
      axios
        .post("http://localhost:5000/users", data)
        .then(() => {
          history.push("/login");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setErrorMessage(error.response.data.error);
          } else {
            console.log(error);
          }
        });
    };

    sendSignup();
  };

  return (
    <div>
      <h2>Sign up</h2>
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
        <button type="submit" onClick={handleSignupSubmit}>
          Submit
        </button>
      </div>
      <div>{errorMessage}</div>
    </div>
  );
};

export default SignUpForm;
