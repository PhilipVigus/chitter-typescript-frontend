import React from "react";

export type PeepProps = {
  text: string;
  timeCreated: number;
};

const Peep: React.FC<PeepProps> = ({ text, timeCreated }: PeepProps) => {
  const getTimeCreatedString = () => {
    const date = new Date(timeCreated);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
  };

  return (
    <div>
      <div>
        <span>{text}</span> - <span>{getTimeCreatedString()}</span>
      </div>
    </div>
  );
};

export default Peep;
