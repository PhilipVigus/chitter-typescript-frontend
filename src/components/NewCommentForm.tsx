import React, { useContext, useState } from "react";
import axios from "axios";
import { MainContext } from "../contexts/MainContext";
import "./NewCommentForm.css";

interface CommentProps {
  peepId: number;
}

const NewCommentForm: React.FC<CommentProps> = ({ peepId }: CommentProps) => {
  const [text, setText] = useState<string>("");
  const [userState, , , setLastUpdateTime] = useContext(MainContext);

  const handleCommentSubmit = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const data = { userId: userState.id, peepId, text };

    const sendNewComment = async () => {
      axios
        .post(`http://localhost:5000/peeps/${peepId}/comments`, data)
        .then(() => {
          setLastUpdateTime(Date.now());
        })
        .catch((error) => console.log(error));
    };

    sendNewComment();
    setText("");
  };

  return (
    <div className="new-comment-form-container">
      <textarea
        className="new-comment-form-container__input"
        rows={3}
        placeholder="Reply"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <input
          className="new-comment-form__button"
          type="button"
          value="Submit"
          onClick={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default NewCommentForm;
