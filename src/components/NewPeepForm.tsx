import React, { useState, useContext } from "react";
import axios from "axios";
import useUserState from "../hooks/useUserState";
import { MainContext } from "../contexts/MainContext";

const NewPeepForm: React.FC = () => {
  const [text, setText] = useState<string>("");
  const { getUserId } = useUserState();
  const [, , , setLastUpdateTime] = useContext(MainContext);

  const handlePeepSubmit = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const data = { userId: getUserId(), text };

    const sendNewPeep = async () => {
      axios
        .post("http://localhost:5000/peeps", data)
        .then((response) => {
          setLastUpdateTime(Date.now());
        })
        .catch((error) => console.log(error));
    };

    sendNewPeep();
    setText("");
  };

  return (
    <div>
      <div>New Peep</div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <div>
        <input type="button" value="Submit" onClick={handlePeepSubmit} />
      </div>
    </div>
  );
};

export default NewPeepForm;
