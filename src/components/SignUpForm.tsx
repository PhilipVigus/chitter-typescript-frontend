import React from "react";

const SignUpForm: React.FC = () => {
  return (
    <div>
      <label htmlFor="username">Username</label>
      <input type="textbox" id="username" name="username" />
    </div>
  );
};

export default SignUpForm;
