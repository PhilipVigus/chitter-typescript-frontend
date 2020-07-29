import React, { useState } from "react";
import { LikesProps } from "../contexts/MainContext";

export type LikesWidgeProps = {
  likes: Array<LikesProps>;
  liked: boolean;
};

const LikesWidget: React.FC<LikesWidgeProps> = ({
  likes,
  liked
}: LikesWidgeProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likeButtonLabel, setLikeButtonLabel] = useState<string>(
    liked ? "Unlike" : "Like"
  );
  const [numberOfLikes, setNumberOfLikes] = useState<number>(likes.length);

  const handleLikeClick = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    evt.preventDefault();

    if (isLiked) {
      setLikeButtonLabel("Like");
      setNumberOfLikes((currentNumber) => currentNumber - 1);
    } else {
      setLikeButtonLabel("Unlike");
      setNumberOfLikes((currentNumber) => currentNumber + 1);
    }

    setIsLiked((currentLiked) => !currentLiked);
  };

  return (
    <div>
      {numberOfLikes}
      <input type="button" value={likeButtonLabel} onClick={handleLikeClick} />
    </div>
  );
};

export default LikesWidget;
