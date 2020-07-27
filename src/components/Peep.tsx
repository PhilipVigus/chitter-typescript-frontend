import React from "react";

export type PeepProps = {
  _id: number;
  _userID: number;
  _username: string;
  _text: string;
  _timeCreated: Date;
};

const Peep: React.FC<PeepProps> = ({
  _username,
  _text,
  _timeCreated
}: PeepProps) => {
  const getTimeCreatedString = () => {
    const date = new Date(_timeCreated);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
  };

  return (
    <div>
      <div>
        <span>{_username} - </span>
        <span>{_text}</span> - <span>{getTimeCreatedString()}</span>
      </div>
    </div>
  );
};

export default Peep;
