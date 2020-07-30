import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext, PeepProps } from "../contexts/MainContext";
import LikesWidget from "./LikesWidget";

const PeepSummary: React.FC<PeepProps> = ({
  id,
  username,
  text,
  timeCreated,
  comments,
  likes
}: PeepProps) => {
  const [userState] = useContext(MainContext);

  const getTimeCreatedString = () => {
    const date = new Date(timeCreated);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
  };

  const isLiked = () => {
    return likes.includes(userState.name as string);
  };

  return (
    <Link to={`/peeps/${id}`}>
      <div>
        <span>{username} - </span>
        <span>{text}</span> - <span>{getTimeCreatedString()}</span>
        <div>{`${comments.length} comments`}</div>
        <LikesWidget likes={likes} liked={isLiked()} peepId={id} />
      </div>
    </Link>
  );
};

export default PeepSummary;
