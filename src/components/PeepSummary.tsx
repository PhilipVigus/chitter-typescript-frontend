import React from "react";

export type PeepSummaryProps = {
  id: number;
  userId: number;
  username: string;
  text: string;
  timeCreated: Date;
};

const PeepSummary: React.FC<PeepSummaryProps> = ({
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
    <div>
      <div>
        <span>{username} - </span>
        <span>{text}</span> - <span>{getTimeCreatedString()}</span>
      </div>
    </div>
  );
};

export default PeepSummary;
