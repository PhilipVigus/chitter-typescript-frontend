import React, { useContext, useState } from "react";
import axios from "axios";
import { LikesProps, MainContext } from "../contexts/MainContext";
import "./LikesWidget.css";

export type LikesWidgeProps = {
  likes: Array<LikesProps>;
  liked: boolean;
  peepId: number;
  disabled: boolean;
};

const LikesWidget: React.FC<LikesWidgeProps> = ({
  likes,
  liked,
  peepId,
  disabled
}: LikesWidgeProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(likes.length);
  const [userState, , , setLastUpdateTime] = useContext(MainContext);

  const handleLikeClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();

    const addLike = async () => {
      const data = { userId: userState.id };
      axios
        .post(`http://localhost:5000/peeps/${peepId}/likes`, data)
        .then(() => {
          setNumberOfLikes((currentNumber) => currentNumber + 1);
          setIsLiked((currentLiked) => !currentLiked);
          setLastUpdateTime(Date.now());
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const deleteLike = async () => {
      axios
        .delete(`http://localhost:5000/peeps/${peepId}/likes/${userState.id}`)
        .then(() => {
          setNumberOfLikes((currentNumber) => currentNumber - 1);
          setIsLiked((currentLiked) => !currentLiked);
          setLastUpdateTime(Date.now());
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (isLiked) {
      deleteLike();
    } else {
      addLike();
    }
  };

  return (
    <div>
      <button type="button" disabled={disabled} onClick={handleLikeClick}>
        {isLiked ? (
          <i className="fas fa-heart likes-widget__icon" />
        ) : (
          <i className="far fa-heart likes-widget__icon" />
        )}
        {numberOfLikes}
      </button>
    </div>
  );
};

export default LikesWidget;
