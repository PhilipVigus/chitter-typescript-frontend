import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext, PeepProps } from "../contexts/MainContext";
import LikesWidget from "./LikesWidget";
import getTimeCreatedString from "./helpers/getTimeCreatedString";
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

  const isLiked = () => {
    return likes.includes(userState.name as string);
  };

  const userIsAuthor = () => {
    return userState.name === username;
  };

  return (
    <Link to={`/peeps/${id}`}>
      <div className="peep-summary-container">
        <div className="peep-summary-container__header">
          <div>@{username}</div>
          <div className="peep-summary-container__time-created">
            {getTimeCreatedString(timeCreated)}
          </div>
        </div>
        <div className="peep-summary-container__text">{text}</div>
        <div className="peep-summary-container__statuses">
          <div className="peep-summary-container__status">
            <i className="far fa-comment-alt peep-summary-container__icon " />
            {comments.length}
          </div>
          <div className="peep-summary-container__status">
            <LikesWidget
              likes={likes}
              liked={isLiked()}
              peepId={id}
              disabled={userIsAuthor()}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PeepSummary;
