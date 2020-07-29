import React, { useContext, useState } from "react";
import axios from "axios";
import { LikesProps, MainContext } from "../contexts/MainContext";

export type LikesWidgeProps = {
  likes: Array<LikesProps>;
  liked: boolean;
  peepId: number;
};

const LikesWidget: React.FC<LikesWidgeProps> = ({
  likes,
  liked,
  peepId
}: LikesWidgeProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likeButtonLabel, setLikeButtonLabel] = useState<string>(
    liked ? "Unlike" : "Like"
  );
  const [numberOfLikes, setNumberOfLikes] = useState<number>(likes.length);
  const [userState] = useContext(MainContext);

  const handleLikeClick = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    evt.preventDefault();

    const addLike = async () => {
      const data = { userId: userState.id };
      axios
        .post(`http://localhost:5000/peeps/${peepId}/likes`, data)
        .then(() => {
          setLikeButtonLabel("Unlike");
          setNumberOfLikes((currentNumber) => currentNumber + 1);
          setIsLiked((currentLiked) => !currentLiked);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const deleteLike = async () => {
      axios
        .delete(`http://localhost:5000/peeps/${peepId}/likes/${userState.id}`)
        .then(() => {
          setLikeButtonLabel("Like");
          setNumberOfLikes((currentNumber) => currentNumber - 1);
          setIsLiked((currentLiked) => !currentLiked);
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
      {numberOfLikes}
      <input type="button" value={likeButtonLabel} onClick={handleLikeClick} />
    </div>
  );
};

export default LikesWidget;
