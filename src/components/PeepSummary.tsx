import React from "react";
import { Link } from "react-router-dom";
import { PeepProps } from "../contexts/MainContext";

const PeepSummary: React.FC<PeepProps> = ({
  id,
  username,
  text,
  timeCreated,
  comments
}: PeepProps) => {
  const getTimeCreatedString = () => {
    const date = new Date(timeCreated);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
  };

  return (
    <Link to={`/peeps/${id}`}>
      <div>
        <span>{username} - </span>
        <span>{text}</span> - <span>{getTimeCreatedString()}</span>
        <div>{`${comments.length} comments`}</div>
      </div>
    </Link>
  );
};

export default PeepSummary;
