import React from "react";
import { Link } from "react-router-dom";

export type PeepSummaryProps = {
  id: number;
  userId: number;
  username: string;
  text: string;
  timeCreated: Date;
};

const PeepSummary: React.FC<PeepSummaryProps> = ({
  userId,
  username,
  text,
  timeCreated
}: PeepSummaryProps) => {
  const getTimeCreatedString = () => {
    const date = new Date(timeCreated);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
  };

  return (
    <Link to={`/peep/${userId}`}>
      <div>
        <span>{username} - </span>
        <span>{text}</span> - <span>{getTimeCreatedString()}</span>
      </div>
    </Link>
  );
};

export default PeepSummary;
