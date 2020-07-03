import React, { useState } from "react";
import axios from "axios";

export type NewPeepFormProps = {
  newPeepCallback: () => void;
};

const NewPeepForm: React.FC<NewPeepFormProps> = ({
  newPeepCallback
}: NewPeepFormProps) => {
  const [text, setText] = useState<string>("");

  const handlePeepSubmit = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const data = { text };

    const sendNewPeep = async () => {
      axios
        .post("https://localhost:5000/peeps", data)
        .then((response) => console.log("success"))
        .catch((error) => console.log(error));
    };

    sendNewPeep();
    setText("");
    newPeepCallback();
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
