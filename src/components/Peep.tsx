import React from "react";

export type PeepProps = {
  id: number;
  userId: number;
  username: string;
  text: string;
  timeCreated: Date;
};

const Peep: React.FC<PeepProps> = ({
  username,
  text,
  timeCreated
}: PeepProps) => {
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

export default Peep;
