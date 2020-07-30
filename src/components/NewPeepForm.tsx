import React, { useState, useContext } from "react";
import axios from "axios";
import { MainContext } from "../contexts/MainContext";
import "./NewPeepForm.css";

const NewPeepForm: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [userState, , , setLastUpdateTime] = useContext(MainContext);

  const handlePeepSubmit = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const data = { userId: userState.id, text };

    const sendNewPeep = async () => {
      axios
        .post("http://localhost:5000/peeps", data)
        .then(() => {
          setLastUpdateTime(Date.now());
        })
        .catch((error) => console.log(error));
    };

    sendNewPeep();
    setText("");
  };

  return (
    <div className="new-peep-form-container">
      <textarea
        className="new-peep-form-container__input"
        rows={6}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <input
          className="new-peep-form__button"
          type="button"
          value="Tell the world"
          onClick={handlePeepSubmit}
        />
      </div>
    </div>
  );
};

export default NewPeepForm;
