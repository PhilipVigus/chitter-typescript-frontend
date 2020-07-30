import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext, PeepProps } from "../contexts/MainContext";
import LikesWidget from "./LikesWidget";
import "./PeepSummary.css";

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

  const userIsAuthor = () => {
    return userState.name === username;
  };

  return (
    <Link to={`/peeps/${id}`}>
      <div className="peep-summary-container">
        <div className="peep-summary__header">
          <div>@{username}</div>
          <div className="peep-summary__time-created">
            {getTimeCreatedString()}
          </div>
        </div>
        <div>{text}</div>
        <div>{`${comments.length} comments`}</div>
        <LikesWidget
          likes={likes}
          liked={isLiked()}
          peepId={id}
          disabled={userIsAuthor()}
        />
      </div>
    </Link>
  );
};

export default PeepSummary;
