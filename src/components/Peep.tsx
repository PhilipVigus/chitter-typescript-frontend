import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainContext, CommentProps, PeepProps } from "../contexts/MainContext";
import NewCommentForm from "./NewCommentForm";

const Peep: React.FC = () => {
  const [, , peeps] = useContext(MainContext);
  const { id } = useParams();
  const [peep, setPeep] = useState<PeepProps | null>();

  useEffect(() => {
    const getPeep = (): {
      id: number;
      userId: number;
      username: string;
      text: string;
      timeCreated: string;
      comments: CommentProps[];
    } | null => {
      const idAsNumber = parseInt(id, 10);
      for (let i = 0; i < peeps.length; i += 1) {
        if (peeps[i].id === idAsNumber) {
          const foundPeep = peeps[i];

          setPeep({
            id: foundPeep.id,
            userId: foundPeep.userId,
            username: foundPeep.username,
            text: foundPeep.text,
            timeCreated: foundPeep.timeCreated,
            comments: foundPeep.comments
          });
        }
      }

      return null;
    };

    if (peeps) {
      getPeep();
    }
  }, [id, peeps]);

  const getTimeCreatedString = (timeCreated: string | undefined) => {
    const date = new Date(timeCreated as string);

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
  };

  const formatPeep = () => {
    return (
      <>
        <div>{peep?.username}</div>
        <div>{peep?.text}</div>
        <div>{getTimeCreatedString(peep?.timeCreated)}</div>
        {peep?.comments.map((comment) => {
          return (
            <div key={comment.id}>
              <div>{comment.text}</div>
              <div>{comment.username}</div>
              <div>{getTimeCreatedString(comment?.timeCreated)}</div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <h2>Individual peep</h2>
      {peep && formatPeep()}
      <NewCommentForm peepId={id} />
    </div>
  );
};

export default Peep;
