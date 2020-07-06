import React from "react";

type PeepProps = {
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
