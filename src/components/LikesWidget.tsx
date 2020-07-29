import React, { useState } from "react";
import { LikesProps } from "../contexts/MainContext";

export type LikesWidgeProps = {
  likes: Array<LikesProps>;
};

const LikesWidget: React.FC<LikesWidgeProps> = ({ likes }: LikesWidgeProps) => {
  const [likeButtonLabel, setLikeButtonLabel] = useState<string>("Like");
  const [numberOfLikes, setNumberOfLikes] = useState<number>(likes.length);

  const handleLikeClick = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    evt.preventDefault();
    if (likeButtonLabel === "Like") {
      setLikeButtonLabel("Unlike");
      setNumberOfLikes((likesNum) => likesNum + 1);
    } else {
      setLikeButtonLabel("Like");
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
