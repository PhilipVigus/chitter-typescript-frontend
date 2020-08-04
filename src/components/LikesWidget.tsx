import React, { useContext, useState } from "react";
import axios from "axios";
import BACKEND_URL from "../config/config";
import { LikesProps, MainContext } from "../contexts/MainContext";
import "./LikesWidget.css";

export type LikesWidgetProps = {
  likes: Array<LikesProps>;
  liked: boolean;
  peepId: number;
  disabled: boolean;
};

const LikesWidget: React.FC<LikesWidgetProps> = ({
  likes,
  liked,
  peepId,
  disabled
}: LikesWidgetProps) => {
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
        .post(`${BACKEND_URL}/peeps/${peepId}/likes`, data)
        .then(() => {
          setNumberOfLikes((currentNumber) => currentNumber + 1);
          setIsLiked((currentLiked) => !currentLiked);
          setLastUpdateTime(Date.now());
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const deleteLike = async () => {
      axios
        .delete(`${BACKEND_URL}/peeps/${peepId}/likes/${userState.id}`)
        .then(() => {
          setNumberOfLikes((currentNumber) => currentNumber - 1);
          setIsLiked((currentLiked) => !currentLiked);
          setLastUpdateTime(Date.now());
        })
        .catch((error) => {
          console.error(error);
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
      <button
        className="likes-widget__button"
        type="button"
        disabled={disabled}
        onClick={handleLikeClick}
      >
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
