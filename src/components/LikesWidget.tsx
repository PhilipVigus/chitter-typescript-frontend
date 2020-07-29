import React, { useState } from "react";
import { LikesProps } from "../contexts/MainContext";

export type LikesWidgeProps = {
  likes: Array<LikesProps>;
};

const LikesWidget: React.FC<LikesWidgeProps> = ({ likes }: LikesWidgeProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeButtonLabel, setLikeButtonLabel] = useState<string>("Like");
  const [numberOfLikes, setNumberOfLikes] = useState<number>(likes.length);

  const handleLikeClick = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    evt.preventDefault();

    if (isLiked) {
      setLikeButtonLabel("Like");
      setNumberOfLikes((likesNum) => likesNum - 1);
    } else {
      setLikeButtonLabel("Unlike");
      setNumberOfLikes((likesNum) => likesNum + 1);
    }

    setIsLiked((liked) => !liked);
  };

  return (
    <div>
      {numberOfLikes}
      <input type="button" value={likeButtonLabel} onClick={handleLikeClick} />
    </div>
  );
};

export default LikesWidget;
