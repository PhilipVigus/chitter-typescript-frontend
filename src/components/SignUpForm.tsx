import React from "react";

const SignUpForm: React.FC = () => {
  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="textbox" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
    </div>
  );
};

export default SignUpForm;
