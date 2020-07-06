import React from "react";

export type PeepProps = {
  text: string;
};

const Peep: React.FC<PeepProps> = ({ text }: PeepProps) => {
  return (
    <div>
      <div>{text}</div>
    </div>
  );
};

export default Peep;
