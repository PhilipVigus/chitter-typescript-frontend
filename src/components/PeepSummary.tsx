import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PeepProps } from "../contexts/MainContext";

const PeepSummary: React.FC<PeepProps> = ({
  id,
  username,
  text,
  timeCreated,
  comments,
  likes
}: PeepProps) => {
  const [likeButtonLabel, setLikeButtonLabel] = useState<string>("Like");

  const getTimeCreatedString = () => {
    const date = new Date(timeCreated);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
  };

  const handleLikeClick = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    evt.preventDefault();
    if (likeButtonLabel === "Like") {
      setLikeButtonLabel("Unlike");
    } else {
      setLikeButtonLabel("Like");
    }
  };

  return (
    <Link to={`/peeps/${id}`}>
      <div>
        <span>{username} - </span>
        <span>{text}</span> - <span>{getTimeCreatedString()}</span>
        <div>{`${comments.length} comments`}</div>
        <div>
          {likes.length}
          <input
            type="button"
            value={likeButtonLabel}
            onClick={handleLikeClick}
          />
        </div>
      </div>
    </Link>
  );
};

export default PeepSummary;
