import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import BACKEND_URL from "../config/config";

type IUserState = {
  name?: string;
  id?: number;
};

type IMainContext = [
  IUserState,
  React.Dispatch<React.SetStateAction<IUserState>>,
  PeepProps[],
  React.Dispatch<React.SetStateAction<number>>
];

export type CommentProps = {
  id: number;
  userId: number;
  peepId: number;
  username: string;
  text: string;
  timeCreated: string;
};

export type LikesProps = string;

export type PeepProps = {
  id: number;
  userId: number;
  username: string;
  text: string;
  timeCreated: string;
  comments: Array<CommentProps>;
  likes: Array<LikesProps>;
};

const MainContext = createContext<IMainContext>([
  {},
  () => null,
  [],
  () => null
]);

type IProps = {
  children: React.ReactNode;
  initialState: Record<string, unknown>;
};

const MainContextProvider: React.FC<IProps> = ({
  children,
  initialState
}: IProps) => {
  const [userState, setUserState] = useState(initialState);
  const [peeps, setPeeps] = useState<PeepProps[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const fetchPeeps = async () => {
      axios
        .get(`${BACKEND_URL}/peeps`, {
          cancelToken: source.token
        })
        .then((result) => {
          setPeeps(result.data.peeps);
        })
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            console.error("Peeps get request cancelled");
          } else {
            console.error("Error getting peeps");
          }
        });
    };

    fetchPeeps();

    return () => {
      source.cancel("Peeps get request cancelled");
    };
  }, [lastUpdateTime]);

  return (
    <MainContext.Provider
      value={[userState, setUserState, peeps, setLastUpdateTime]}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
