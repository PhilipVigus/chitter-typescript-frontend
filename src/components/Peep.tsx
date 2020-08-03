import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MainContext,
  CommentProps,
  PeepProps,
  LikesProps
} from "../contexts/MainContext";
import NewCommentForm from "./NewCommentForm";
import LikesWidget from "./LikesWidget";
import getTimeCreatedString from "./helpers/getTimeCreatedString";
import "./Peep.css";

const Peep: React.FC = () => {
  const [userState, , peeps] = useContext(MainContext);
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
      likes: LikesProps[];
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
            comments: foundPeep.comments,
            likes: foundPeep.likes
          });

          break;
        }
      }

      return null;
    };

    if (peeps) {
      getPeep();
    }
  }, [id, peeps]);

  const isLiked = () => {
    return peep?.likes.includes(userState.name as string);
  };

  const userIsAuthor = () => {
    return userState.name === peep?.username;
  };

  const formatPeep = () => {
    return (
      <div>
        <div className="peep-container">
          <div className="peep-container__header">
            <div className="peep-container__username">@{peep?.username}</div>
            <div className="peep-container__time-created">
              {getTimeCreatedString(peep?.timeCreated as string)}
            </div>
            <Link className="back-link" to="/peeps">
              <i className="fas fa-times" />
            </Link>
          </div>
          <div className="peep-container__text">{peep?.text}</div>
          <div className="peep-container__statuses">
            <div className="peep-container__status">
              <LikesWidget
                likes={peep?.likes as string[]}
                liked={isLiked() as boolean}
                peepId={peep?.id as number}
                disabled={userIsAuthor()}
              />
            </div>
          </div>
          {peep?.comments.map((comment) => {
            return (
              <div key={comment.id} className="comment-container">
                <div className="comment-container__header">
                  <div>@{comment.username}</div>
                  <div className="comment-container__time-created">
                    {getTimeCreatedString(comment?.timeCreated)}
                  </div>
                </div>
                <div className="comment-container__text">{comment.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {peep && formatPeep()}
      <NewCommentForm peepId={id} />
    </div>
  );
};

export default Peep;
